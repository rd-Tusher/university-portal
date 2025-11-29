package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.versity.portal.versity_portal.model.TeacherModel;

public interface TeacherRepository extends MongoRepository<TeacherModel,String>{

    Optional<TeacherModel> findByUserID(String id);
}