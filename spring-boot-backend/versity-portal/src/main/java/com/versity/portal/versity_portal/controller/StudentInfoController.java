package com.versity.portal.versity_portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.StudentAttendenceModel;
import com.versity.portal.versity_portal.model.StudentModel;
import com.versity.portal.versity_portal.model.TeacherModel;
import com.versity.portal.versity_portal.repository.StudentAttendenceRepository;
import com.versity.portal.versity_portal.repository.StudentRepository;
import com.versity.portal.versity_portal.repository.TeacherRepository;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;


@RestController
public class StudentInfoController {

    @Autowired
    StudentRepository studentRepository;
    @Autowired 
    JwtService jwtService;
    @Autowired
    StudentAttendenceRepository stuAttenRepo;

    @Autowired
    TeacherRepository teachRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    private String passwordHash(String password){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        char passwordChars[] = password.toCharArray();
        String hashedPassword = argon2.hash(3, 65536, 1, passwordChars);
        return hashedPassword;
    }
    
    @SuppressWarnings("unused")
    private boolean verifyPassword(String hashedPassword, String plainPassword){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        return argon2.verify(hashedPassword, plainPassword.toCharArray());
    }

 

    @PostMapping("/save-student-info")
    public ResponseEntity<?> saveStudentInfo(@RequestBody Map<String, String> data){
        try {
            
            String fullname = data.get("fullName");
            String email = data.get("email");
            String password = data.get("password");
            String department = data.get("department");
            String semester = data.get("semester");
            String teacher = data.get("teacher");
            String re_add = data.get("re_add");

            String userID = email.split("@")[0];
             

            List<String> roles  = new ArrayList<>();

            String hashedPassword = passwordHash(password);

            if(teacher.equals("true")){
                TeacherModel saveModel = new TeacherModel(fullname, userID, email, hashedPassword, department,"teacher");
                teachRepo.save(saveModel);
                return ResponseEntity.ok("Sir, your data saved successfully!");
            }
            else {
                roles.add("student");
            }
            if (re_add.equals("true")) {
                userID = "re-Add" + (userID != null ? userID : "");
            }

 
            StudentAttendenceModel stuModel = new StudentAttendenceModel(userID,department,semester);
            stuAttenRepo.save(stuModel);


            
            StudentModel studentModel = new StudentModel(fullname,email,hashedPassword,userID,department,semester,roles);
            studentRepository.save(studentModel);
            return ResponseEntity.ok("Data saved successfully!") ;

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured");
        }
    }

    @GetMapping("/fetch-user-info")
    public ResponseEntity<?> fetchUserData(@CookieValue(value = "access_token") String token){
        try {
            String userID = jwtService.extractUserID(token);
            Query query = new Query();
            query.addCriteria(Criteria.where("userID").is(userID));

            StudentModel res = mongoTemplate.findOne(query, StudentModel.class);
            if(res != null){
                return ResponseEntity.ok(res);
            }
            return ResponseEntity.badRequest().body("User not found!");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found");
        }

    }   

    @GetMapping("/fetch-all-user-info")
    public ResponseEntity<?> fetchAllUser(@RequestParam String department,@RequestParam String semester){
        try {
            List<StudentModel> response = studentRepository.findByDepartmentAndSemester(department, semester);
        return ResponseEntity.ok().body(response);
        } catch (Exception e) {
        System.out.println(e);
        return ResponseEntity.badRequest().body("Error occured while fetching data");
        }
    }

    @GetMapping("/fui")
    public ResponseEntity<?> fui(@CookieValue(value = "access_token") String token){
        try {
            boolean isTokenExpired = jwtService.isTokenExpired(token);
            return ResponseEntity.ok("username name is " + isTokenExpired);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found");
        }
 
    }


        @GetMapping("/fetch-all-user-id-info")
    public ResponseEntity<?> fetchIDOnly(@RequestParam String department,@RequestParam String semester){
        try {
            List<StudentRepository.NameIDProjection> response = studentRepository.getInfoByDeptAndSem(department,semester);
        return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body("Error occured while fetching data");
        }
    }
} 