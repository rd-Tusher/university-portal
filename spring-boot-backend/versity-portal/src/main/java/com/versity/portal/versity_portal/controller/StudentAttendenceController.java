package com.versity.portal.versity_portal.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.StudentAttendenceModel;
import com.versity.portal.versity_portal.model.StudentAttendenceModel.AttendenceRequest;
import com.versity.portal.versity_portal.model.StudentAttendenceModel.Courses;
import com.versity.portal.versity_portal.model.StudentAttendenceModel.AttendenceRequest.Attendence;
import com.versity.portal.versity_portal.model.StudentAttendenceModel.Courses.Records;
import com.versity.portal.versity_portal.repository.StudentAttendenceRepository;
import com.versity.portal.versity_portal.repository.StudentAttendenceRepository.CourseAttendanceProjection;

@RestController
public class StudentAttendenceController {
    @Autowired 
    StudentAttendenceRepository stuAttenRepo;


    @GetMapping("fetch-student-attend-info")
    public ResponseEntity<?> fetchStuAtten(@RequestParam Map<String,String> data){
        try {
            String department = data.get("department");
            String semester = data.get("semester");
            String courseID = data.get("courseID");
            List<CourseAttendanceProjection> response = stuAttenRepo.findCourseAttendanceByDeptAndSemesterAndCourseID(department, semester, courseID);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured!");
        }
    } 

    @PostMapping("save-student-attendence-record")
    public ResponseEntity<?> saveStudentAtten(@RequestBody AttendenceRequest req){
        try {
            String department = req.getDepartment();
            String semester = req.getSemester();
            String courseID = req.getCourseID();
            // System.out.println(department);
            // System.out.println(semester);
            // System.out.println(courseID);
            List<Attendence> attens = req.getAttens();
            List<StudentAttendenceModel> existing = stuAttenRepo.findByDepartmentAndSemester(department, semester);
            
            for (StudentAttendenceModel student : existing) {
                for (Attendence atten : attens) {
                    if(student.getUserID().equals(atten.getUserID())){

                        for (Courses course : student.getCourses()) {
                            if(course.getCourseID().equals(courseID)){

                                
                                int attendence = course.getClassAtten();
                                String updatedAt = atten.getUpdatedAt();

                                boolean isRecorded = course.getRecords().stream().anyMatch(d -> d.getDate().equals(updatedAt));
                                
                                if(!isRecorded){
                                    if(attendence == atten.getClassAtten()){
                                        Records record = new Records(atten.getUpdatedAt(),"Absent");
                                        course.getRecords().add(record);
                                    }
                                    else {
                                        Records record = new Records(atten.getUpdatedAt(),"Present");
                                        course.getRecords().add(record);
                                    }
                                }

                                course.setClassAbsent(atten.getClassAbsent());
                                course.setClassAtten(atten.getClassAtten());
                                course.setUpdatedAt(atten.getUpdatedAt());
                            }

                            stuAttenRepo.save(student);
                        }
                         
                    }
                }
            }
            return ResponseEntity.ok().body(existing);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured!");
        }
    }

    
} 