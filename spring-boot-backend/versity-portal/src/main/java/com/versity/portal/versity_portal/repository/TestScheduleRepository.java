package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.TestScheduleModel;

@Repository
public interface TestScheduleRepository extends MongoRepository < TestScheduleModel, String> {
    @Query("{'testInfo.schedule.testNo' : ?0}")
    Optional<TestScheduleModel> findByTestNo(String testNo);
}  