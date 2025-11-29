package com.versity.portal.versity_portal.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.Service.CourseService;
import com.versity.portal.versity_portal.model.CourseAttendenceModel;
import com.versity.portal.versity_portal.model.CourseModel;
import com.versity.portal.versity_portal.model.StudentAttendenceModel;
import com.versity.portal.versity_portal.model.StudentAttendenceModel.Courses;
import com.versity.portal.versity_portal.repository.CourseAttendenceRepository;
import com.versity.portal.versity_portal.repository.CourseRepository;
import com.versity.portal.versity_portal.repository.StudentAttendenceRepository;
import com.versity.portal.versity_portal.repository.CourseRepository.CourseProjection;

@RestController 
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    JwtService jwtService;
    
    @Autowired
    CourseAttendenceRepository crsRepo;

    @Autowired
    StudentAttendenceRepository stuAttRepo;

    @Autowired
    CourseService crsService;


    @PostMapping("/save-course-info")
    public ResponseEntity<?> saveCourseData(@RequestBody List<CourseModel> courses){
        try {
            for(CourseModel course : courses){

                // Adding to the Course Collection
                Optional<CourseModel> existing = courseRepository.findByDepartmentAndSemesterAndCourseID(course.getDepartment(), course.getSemester(),course.getCourseID());
                if (existing.isPresent()) {
                    CourseModel existingCourse = existing.get();
                    existingCourse.setCourseName(course.getCourseName());
                    existingCourse.setCourseID(course.getCourseID());
                    existingCourse.setCourseTeacher(course.getCourseTeacher());
                    existingCourse.setRoutines(course.getRoutines());
                } else {
                    courseRepository.save(course);
                } 

                // Adding this course to the Course Attendence collection
                Optional<CourseAttendenceModel> exists = crsRepo.findByCourseID(course.getCourseID());
                if(!exists.isPresent()){
                    CourseAttendenceModel crsModel = new CourseAttendenceModel(course.getCourseID());
                    crsRepo.save(crsModel);
                }

                // Adding course tot the Student attendence collection
                List<StudentAttendenceModel> students = stuAttRepo.findByDepartmentAndSemester(course.getDepartment(),course.getSemester());
                for(StudentAttendenceModel student : students){
                    boolean isExistsCourse = student.getCourses().stream().anyMatch(c -> c.getCourseID().equals(course.getCourseID()));
                    if(!isExistsCourse){
                        student.getCourses().add(new Courses(course.getCourseID(),0,0));
                    }
                    
                    stuAttRepo.save(student);

                }
            }
            return ResponseEntity.ok("Courses saved/updated Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Occured!");
        }
    } 


    @GetMapping("fetch-course-name-id")
    public ResponseEntity<?> fetchCourseInfo(@RequestParam Map<String, String> data){
        try {
            String department = data.get("department");
            String semester = data.get("semester");
            List<CourseProjection> response = courseRepository.findCourseByDepartmentAndSemester(department, semester);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not found!");
        }
    }


    @GetMapping("fetch-course-name-id-by-teacher")
    public ResponseEntity<?> fetchCourseByTeacher(@CookieValue(value = "access_token") String tooken){
        try {
            String tname = jwtService.extractName(tooken);
            List<CourseProjection> res = courseRepository.findByCourseTeacher(tname);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Not found");
        }
    }

    @GetMapping("fetch-course-info-student")
    public ResponseEntity<?> fetchCourseInfoStu(@CookieValue(value = "access_token") String token){
        try {
            String department = jwtService.extractDepartment(token);
            String semester = jwtService.extractSemester(token);
            return crsService.getStudentCourse( department, semester);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not found!");
        }
    }


    @GetMapping("get-teacher-course")
    public ResponseEntity<?> getTechCourse(@CookieValue(value = "access_token") String token){
        try {
            String name = jwtService.extractName(token);
            return crsService.getTeacherCourse(name);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occured!");
        }
    }

    @GetMapping("get-course-name&id")
    public ResponseEntity<?> getCrsNameAndId(@CookieValue(value = "access_token") String token){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);
            return crsService.getCrsNameAndId(dept, sem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured or token expired!");
        }
    }

    @GetMapping("fetch-today-course")
    public ResponseEntity<?> getTodaysCourse(@CookieValue(value = "access_token") String token){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);
            return crsService.getTodaysCourse(dept, sem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

} 