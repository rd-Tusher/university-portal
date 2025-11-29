package com.versity.portal.versity_portal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "teacher_collection")
public class TeacherModel {

    @Id
    private String Id;

    @Indexed
    private String userID;
    private String fullname;
    private String email;
    private String password;
    private String department;
    private String role;

    public TeacherModel(String fullname, String userID, String email,String password, String department,String role){
        this.fullname = fullname;
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = role;
    }

    
}