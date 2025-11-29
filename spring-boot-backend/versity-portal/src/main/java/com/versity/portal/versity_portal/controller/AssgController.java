package com.versity.portal.versity_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.versity.portal.versity_portal.Service.AssignmentService;
import com.versity.portal.versity_portal.repository.AssgRepository;
import lombok.Data;

@Data
@RestController
public class AssgController {
 
    @Autowired
    AssgRepository assgRepo;

    @Autowired
    JwtService jwtService;

    @Autowired
    AssignmentService assgService;

    @Value("${upload.dir}")
    private String uploadBaseDir;


    @PostMapping("submit-assg")
    public ResponseEntity<?> subMitAssg(
        @RequestParam String department,
        @RequestParam String semester,
        @RequestParam String courseID,
        @RequestParam String assgId,
        @RequestParam(value = "files",required = false) MultipartFile[] files,
        @CookieValue(value = "access_token") String token ){

       try {

        String studentID = jwtService.extractUserID(token);
        return assgService.submitAssignment(department, semester, courseID, assgId, studentID, files, token);

       } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Unauthorized or invalid token");
       }
    }


    @GetMapping("fetch-student-submit")
    public ResponseEntity<?> getStudentSubmit(@RequestParam String department, @RequestParam String semester, @RequestParam String courseID , @RequestParam String assgId){

        try {
            return assgService.getStudentSubmit(department, semester, courseID,assgId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}