package com.versity.portal.versity_portal.model;

import java.util.List;
public class TopicCourseModel {

    private String courseID;
    private String courseName;
    List<Topics> topics;

    public TopicCourseModel(String courseID, String courseName, List<Topics> topics){
        this.courseID = courseID;
        this.courseName = courseName;
        this.topics = topics;
    }

    public String getCourseID() {
        return courseID;
    }
    public List<Topics> getTopics() { 
        return topics;
    }
    public String getCourseName() {
        return courseName;
    }

}