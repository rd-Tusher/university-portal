package com.versity.portal.versity_portal.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "test-result")
public class TestResultModel {
    private String department;
    private String semester;
    private String courseID;
    private String testID;
    List<ResultModel> testResults;
    

    public TestResultModel(String department, String semester, String courseID, String testID,List<ResultModel> testResults){
        this.department = department;
        this.courseID = courseID;
        this.testID = testID;
        this.semester = semester;
        this.testResults = testResults;
    }

    @Data
    public static class ResultModel {
        private String userID;
        private String testMark;
    }

    @Data
    public static class Request {
        private String courseID;
        private String testID;
        private List<ResultModel> results;

    }


}