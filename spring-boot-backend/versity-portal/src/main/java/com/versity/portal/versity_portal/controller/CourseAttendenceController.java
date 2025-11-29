package com.versity.portal.versity_portal.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.CourseAttendenceModel;
import com.versity.portal.versity_portal.repository.CourseAttendenceRepository;

@RestController
public class CourseAttendenceController {
    @Autowired
    CourseAttendenceRepository courseAttendenceRepository;


    @GetMapping("fetch-course-attendence-info")
    public ResponseEntity<?> fetchTotalClass(@RequestParam String courseID){
        try {
            Optional<CourseAttendenceModel> response = courseAttendenceRepository.findById(courseID);

            if(response.isPresent()){
                return ResponseEntity.ok(response.get());
            } else {
                return ResponseEntity.badRequest().body("Course not found!");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Not found any course!");
        }
    } 

    
    @PostMapping("save-course-attendence-info")
    public ResponseEntity<?> saveTotalClass(@RequestBody CourseAttendenceModel courseAttend){
        try {
            Optional<CourseAttendenceModel> response = courseAttendenceRepository.findByCourseID(courseAttend.getCourseID());
            if (response.isPresent()) {

                CourseAttendenceModel existing = response.get();
                if(existing.getUpdatedAt().equals(courseAttend.getUpdatedAt())){
                    return ResponseEntity.ok("Already updated course attendance!");
                }
                existing.setTotalClass(courseAttend.getTotalClass());
                existing.setUpdatedAt(courseAttend.getUpdatedAt());
                courseAttendenceRepository.save(existing);

            } else {
                courseAttendenceRepository.save(courseAttend);
            }
            return ResponseEntity.ok("Data saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }
}