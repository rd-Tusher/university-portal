package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.versity.portal.versity_portal.model.CourseAttendenceModel;

public interface CourseAttendenceRepository extends MongoRepository<CourseAttendenceModel,String>{
    Optional<CourseAttendenceModel> findByCourseID(String courseID);
    
}