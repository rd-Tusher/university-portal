 package com.versity.portal.versity_portal.model;

import java.util.List;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@CompoundIndexes({
    @CompoundIndex(name = "username_studentId_email_idx",def = "{ 'username' : 1, 'userID' : 1, 'email' : 1 }"),
    @CompoundIndex(name = "username_studentId_idx",def = "{ 'username' : 1, 'userID' : 1}",unique = true)
})


@Data
@Document(collection = "student_collection")
public class StudentModel {
 
    private String fullname;
    private String userID;
    private String email;
    private String password;
    private String department;
    private String semester;
    private List<String> roles;
      
    public StudentModel(){};
    public StudentModel(String fullname,String email,String password,String userID,String department, String semester, List<String> role){
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.userID =userID;
        this.department = department;
        this.semester = semester;
        this.roles = role;
    };



    @Data
    public static class LoginRequest {
        private String userID;
        private String password;
    }
}