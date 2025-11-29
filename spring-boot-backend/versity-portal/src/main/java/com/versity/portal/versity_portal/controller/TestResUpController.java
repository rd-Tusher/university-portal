package com.versity.portal.versity_portal.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.Service.TestResUpService;
import com.versity.portal.versity_portal.model.TestResultModel.Request;
import com.versity.portal.versity_portal.repository.ClassTestRepository;

@RestController
public class TestResUpController {


    @Autowired
    ClassTestRepository classTestRepository;
    @Autowired 
    JwtService jwtService;
    @Autowired
    TestResUpService trpSerice;

    @GetMapping("fetch-all-student-id-name")
    public ResponseEntity<?> getStudentInfo(@CookieValue(value = "access_token") String token){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);
            return trpSerice.getStudentInfo(dept, sem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error Occured!");
        }
    }

    @PostMapping("save-test-result")
    public ResponseEntity<?> saveTestResult(@RequestBody Request req,@CookieValue(value = "access_token") String token ){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);
            return trpSerice.saveTestResult(dept, sem, req.getCourseID(), req.getTestID(), req.getResults());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error Occured!");
        }
    }
} 