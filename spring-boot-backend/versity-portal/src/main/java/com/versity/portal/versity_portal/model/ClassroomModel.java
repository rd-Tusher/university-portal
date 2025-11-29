package com.versity.portal.versity_portal.model;



import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "room_data")
public class ClassroomModel {

    @Id
    private String Id;

    private String department;
    private String semester;
    private String courseID;
    private String courseTeacher;
    private String teacherID;
    private String roomTitle;
    private String createdAt;
    private String updatedAt;
    private List<Assignments> assignments;
    private List<Announcements> announcements;
    private List<Materials> materials;

    public ClassroomModel(){}
    
    
    
    public ClassroomModel( String dept, String sem, String crsID, String crt,String tid, String rommtitle, String ctAt){
        department = dept;
        semester = sem;
        courseID = crsID;
        courseTeacher = crt;
        teacherID  = tid;
        roomTitle = rommtitle;
        createdAt = ctAt;
        assignments = new ArrayList<>();
        announcements = new ArrayList<>();
        materials = new ArrayList<>();
    }


    @Data
    public static class Assignments {
        private String id;
        private String title;
        private String description;
        private String points;
        private String date;
        private String fileUrl;

        public Assignments(){}

        public Assignments(String id, String title, String description,String points,String date, String fileUrl){
            this.id = id;
            this.title = title;
            this.description = description;
            this.points = points;
            this.date = date;
            this.fileUrl = fileUrl;
        }

    }

    @Data
    public static class Announcements {
        private String id;
        private String title;
        private String description;
        private String date;
        List<String> fileUrl;


        public Announcements(String id, String title, String description, String date,List<String> fileUrl){
            this.id = id;
            this.title = title;
            this.description = description;
            this.date = date;
            this.fileUrl = fileUrl;
        }

    }

    @Data
    public static class Materials {
        private String courseID;
        private String id;
        private String title;
        private String description;
        private String date;
        private List<String> fileUrl;

        public Materials(String courseID, String id, String title, List<String> fileUrl, String description, String date){
            this.courseID = courseID;
            this.id = id;
            this.title = title;
            this.fileUrl = fileUrl;
            this.description = description;
            this.date = date;
        }

    }

    @Data
    public static class CreateRoomReq{
        private String courseID;
        private String roomTitle;
    }

    @Data
    public static class AssignmentRequest {
        private String courseID;
        private String title;
        private String description;
        private String points;
        private String date;
        private String file;
    }

    @Data
    public static class AnnouncementRequest {
        private String courseID;
        private String id;
        private String title;
        private String description;
        private String date;
    }
    
    @Data
    public static class MaterialRequest {
        private String courseID;
        private String id;
        private String title;
        private String date;
        private String file;
    }


    @Data
    public static class StudentRoomRequest {
        private String department;
        private String semester;
    }
}