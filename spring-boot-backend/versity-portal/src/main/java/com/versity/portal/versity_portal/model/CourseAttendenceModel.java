package com.versity.portal.versity_portal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@CompoundIndexes({
    @CompoundIndex(name="dept_sem_indx",def = "{'department' : 1, 'semester' : 1}")
})
@Document(collection = "course_attendence")
public class CourseAttendenceModel {
    @Id
    private String courseID;

    private int totalClass;
    private String updatedAt;


    
    public CourseAttendenceModel(){}

    public CourseAttendenceModel(String courseID){
        totalClass = 0;
        updatedAt = null;
        this.courseID = courseID;
    }
    
    public CourseAttendenceModel( String courseID, int totalClass){
        this.updatedAt = null;
        this.courseID = courseID;
        this.totalClass = 0;
    }


    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }
    public String getCourseID() {
        return courseID;
    }


    public void setTotalClass(int totalClass) {
        this.totalClass = totalClass;
    }
    public int getTotalClass() {
        return totalClass;
    }

    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
    public String getUpdatedAt() {
        return updatedAt;
    }
}