package com.versity.portal.versity_portal.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "submitted_assg")
public class AssgSubModel {

    @Id
    private String Id;

    private String department;
    private String semester;
    private String courseID;
    private List<Submission> submissions;

    public AssgSubModel(String department, String semester, String courseID){
        this.department = department;
        this.semester = semester;
        this.courseID = courseID;
        this.submissions = new ArrayList<>();
    }

    @Data
    public static class Submission {
        private String assgId;
        private List<Student> students;

        public Submission(String assgId){
            this.assgId = assgId;
            this.students = new ArrayList<>();
        }
        
        @Data
        public static class Student {
            private String studentID;
            private List<String> file;


            public Student(String studentID){
                this.studentID = studentID;
                this.file = new ArrayList<>();
            }
        }
    }

}