package com.versity.portal.versity_portal.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@CompoundIndexes({
    @CompoundIndex(name = "dept_sem_courID_idx",def = "{'department' : 1, 'semester' : 1, 'courseID' : 1}")
})
@Document(collection  = "lecture_topics")
public class TopicModel {

    @Id
    private String Id;

    private String department;
    private String semester;
    List<TopicCourseModel> topicCourses;


    public TopicModel(String department , String semester, List<TopicCourseModel> topicCourses){
        this.department = department;
        this.semester = semester;
        this.topicCourses = topicCourses;
    }
    public String getDepartment() {
        return department;
    }
    public String getSemester() {
        return semester;
    }
    public List<TopicCourseModel> getTopicCourseModel() {
        return topicCourses;
    }

}