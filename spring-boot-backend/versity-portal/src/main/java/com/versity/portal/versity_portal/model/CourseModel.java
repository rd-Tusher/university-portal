package com.versity.portal.versity_portal.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "course_collection")
public class CourseModel {

    @Id
    private String Id;

    private String department;
    private String semester;
    private String courseID;
    private String courseName;
    private String courseTeacher;
    private List<Routine> routines ;

    public CourseModel(){}
    public CourseModel(String department, String semester, String courseID, String courseName, String coursTeacher, List<Routine> routines){
        this.department = department;
        this.semester = semester;
        this.courseID = courseID;
        this.courseName = courseName;
        this.courseTeacher = coursTeacher;
        this.routines = routines;
    }


    @Data
    public static class Routine {
        private String day;
        private String start;
        private String end;
        private String room;

        public Routine(){}

        public Routine(String day, String start, String end, String room){
            this.day = day;
            this.start = start;
            this.end = end;
            this.room = room;
        }
        
    }

}