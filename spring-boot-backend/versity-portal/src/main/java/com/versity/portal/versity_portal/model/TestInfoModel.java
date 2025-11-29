package com.versity.portal.versity_portal.model;

import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;

public class TestInfoModel {

        private String courseName;

        @Indexed(name = "courseID_idx")
        private String courseID;

        List<TestScheduleModel> schedule;


        public TestInfoModel(String courseName , String courseID, List<TestScheduleModel> schedule){
            this.courseName = courseName;
            this.courseID = courseID;
            this.schedule = schedule;
        }

        public String getCourseID() {
            return courseID;
        }
        public String getCourseName() {
            return courseName;
        }
        public List<TestScheduleModel> getSchedule() {
            return schedule;
        }
}