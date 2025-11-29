package com.versity.portal.versity_portal.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.StudentModel;
import com.versity.portal.versity_portal.model.TeacherModel;
import com.versity.portal.versity_portal.model.StudentModel.LoginRequest;
import com.versity.portal.versity_portal.repository.StudentRepository;
import com.versity.portal.versity_portal.repository.TeacherRepository;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class LoginController {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    TeacherRepository teachRepo;

    @Autowired
    JwtService jwtService;


    private boolean verifyPassword(String hashedPassword, String plainPassword){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        return argon2.verify(hashedPassword, plainPassword.toCharArray());
    }

    @PostMapping("/login")
    public ResponseEntity<?> LoginVerify(@RequestBody LoginRequest req,HttpServletResponse response){
        try {
            
            Map<String, Object> claims = new HashMap<>();
            
            Optional<StudentModel> studentInfo =  studentRepository.findByUserID(req.getUserID());


            if(studentInfo.isPresent()){
                boolean validUser = verifyPassword(studentInfo.get().getPassword(), req.getPassword());
                if(!validUser) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
                }
                else {
                    claims.put("sub", studentInfo.get().getUserID());
                    claims.put("dept",studentInfo.get().getDepartment());
                    claims.put("sem",studentInfo.get().getSemester());
                    claims.put("roles",studentInfo.get().getRoles());
                }
                 
            }
            else{
                Optional<TeacherModel> teacherInfo = teachRepo.findByUserID(req.getUserID());
                if(teacherInfo.isPresent()){
                    boolean validUser = verifyPassword(teacherInfo.get().getPassword(), req.getPassword());
                    if(!validUser){
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
                    }
                    else {
                        claims.put("sub", teacherInfo.get().getUserID());
                        claims.put("dept",teacherInfo.get().getDepartment());
                        claims.put("roles",teacherInfo.get().getRole());
                        claims.put("name",teacherInfo.get().getFullname());
                    }

                }
            }

            String token = jwtService.generateJwtToken(req.getUserID(), claims, 120*60*1000);
            Cookie cookie = new Cookie("access_token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(120*60);
            response.addCookie(cookie);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("role",jwtService.extractRole(token));                

            return ResponseEntity.ok(responseBody);

                 
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found");
        }

    } 
}