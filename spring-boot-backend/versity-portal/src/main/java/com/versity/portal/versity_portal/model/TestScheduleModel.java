package com.versity.portal.versity_portal.model;


public class TestScheduleModel {

    private String testDate;
    private String testMark;
    private String testID;
    private String testType;



    public TestScheduleModel(String testDate, String testMark, String testID, String testType){
        this.testDate = testDate;
        this.testMark = testMark;
        this.testID = testID;
        this.testType = testType;
    }

    public String getTestDate() {
        return testDate;
    }
    public String getTestMark() {
        return testMark;
    }
    public String getTestID() {
        return testID;
    }
    public String getTestType() {
        return testType;
    }
        
}