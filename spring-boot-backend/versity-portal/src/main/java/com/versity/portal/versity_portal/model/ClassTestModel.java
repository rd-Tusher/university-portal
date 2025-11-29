package com.versity.portal.versity_portal.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "test_schedule_docs")
public class ClassTestModel {
    @Id
    private String Id;


    private String courseID;
    private String courseName;
    private String testDate;
    private String testID;
    private String testMark;
    private String testType;
    private String teacherID;
    private String department;
    private String semester;


    public ClassTestModel(String courseID, String courseName, String testDate, String testID, String testMark, String testType, String teacherID,String department, String semester){
        this.courseID = courseID;
        this.courseName = courseName;
        this.testDate = testDate;
        this.testMark = testMark;
        this.testType = testType;
        this.department = department;
        this.semester = semester;
        this.teacherID = teacherID;
        this.testID = testID;
    } 

    @Data
    public static class Request{
        private String courseID;
        private String testDate;
        private String testID;
        private String testMark;
        private String testType;
        private String courseName;
;
    }

} 


