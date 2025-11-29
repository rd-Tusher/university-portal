package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.TopicModel;

@Repository
public interface TopicModelRepository extends MongoRepository<TopicModel,String> {
    Optional<TopicModel> findByDepartmentAndSemester(String department, String semester);
    @Query("{'topicCourses.courseID' : ?0}")
    Optional<TopicModel> findByCourseID(String courseID);
    
}