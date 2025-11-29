package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.OtpModel;

@Repository
public interface OtpRepository extends MongoRepository<OtpModel,String> {
    Optional<OtpModel> findByOtpAndEmail(String otp,String email);
}