package com.versity.portal.versity_portal.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.bson.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.versity.portal.versity_portal.controller.JwtService;

@Component
public class ClassrommService {

    @Autowired 
    JwtService jwtService;
    @Autowired
    MongoTemplate mongoTemplate;



    public String  getTeacherStudent (String token){
        try {
            Object rolesObject = jwtService.extractRole(token);
            if (rolesObject instanceof String roleStr) {
                return roleStr;
            }

            if(rolesObject instanceof List<?> roleList){
                for (Object roleObject : roleList) {
                    if(roleObject != null){
                        String r = roleObject.toString();
                        if(r.equals("teacher") || r.equals("student")){
                            return r;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "not found!";
        }
        return "not found!";
    }


    public ResponseEntity<?> getAllClassrooms(String token){
        try {
            String role = getTeacherStudent(token);
            
            Query docExists = new Query();
            
            docExists.fields().include("roomTitle");
            docExists.fields().include("department");
            docExists.fields().include("semester");
            docExists.fields().include("courseID");
            docExists.fields().include("assignments");
            docExists.fields().include("announcements");
            docExists.fields().include("materials");
            
            if(role.equals("teacher")){
                String tid = jwtService.extractUserID(token);
                docExists.addCriteria(Criteria.where("teacherID").is(tid));

            }
            else if(role.equals("student")){
                String department = jwtService.extractDepartment(token);
                String semester = jwtService.extractSemester(token);
                docExists.addCriteria(Criteria.where("department").is(department).and("semester").is(semester));

            }

            List<Document> response = mongoTemplate.find(docExists, Document.class,"room_data");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }


    public ResponseEntity<?> getClassroomTitle(String tid) {
    try {
        Query query = new Query();
        query.addCriteria(Criteria.where("teacherID").is(tid));
        query.fields().include("roomTitle");

        List<Document> response = mongoTemplate.find(query, Document.class, "room_data");

        if (response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No classroom found for tid: " + tid);
        }

        return ResponseEntity.ok(response);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
    }
}

}  