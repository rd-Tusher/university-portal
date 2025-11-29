package com.versity.portal.versity_portal.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@CompoundIndexes({
    @CompoundIndex(name = "dept_sem_idx",def = "{'department' : 1, 'semester' : 1}")
})


@Data
@Document(collection = "student_attendence")
public class StudentAttendenceModel {

    @Id
    private String Id;

    private String department;
    private String semester;
    private String userID;
    List<Courses> courses;

    public StudentAttendenceModel(){}
    public StudentAttendenceModel(String sid, String dpet, String sem){
        userID = sid;
        department = dpet;
        semester = sem;
        courses = new ArrayList<>();
    }





    @Data
    public static class Courses {
        private String courseID;
        private int classAtten;
        private int classAbsent;
        private String updatedAt;
        List<Records> records;

        public Courses(){
            records = new ArrayList<>();
        }
        public Courses(String courseID,int classAtten,int classAbsent){
            this.classAtten = classAtten;
            this.classAbsent = classAbsent;
            this.courseID = courseID;
            this.updatedAt = null;
        }

        



        @Data
        public static class Records{
            private String date;
            private String status;

            public Records(){}
            public Records(String date, String status){
                this.date = date;
                this.status = status;
            }

        }
    }

    @Data
    public static class AttendenceRequest {
        private String department;
        private String semester;
        private String courseID;
        private List<Attendence> attens;

        @Data
        public static class Attendence {
            private String courseID;
            private String userID;
            private int classAtten;
            private int classAbsent;
            private String updatedAt;

        }
    }
    
}