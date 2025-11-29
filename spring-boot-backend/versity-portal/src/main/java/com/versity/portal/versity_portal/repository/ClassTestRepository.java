

package com.versity.portal.versity_portal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.ClassTestModel; 


@Repository
public interface ClassTestRepository extends MongoRepository<ClassTestModel, String> {

    @Query("{ 'testInfo.courseID': ?0 }")
    Optional<ClassTestModel> findByCourseID(String courseID);

    @Query("{ 'testInfo.schedule.testNo': ?0 }")
    Optional<ClassTestModel> findByNestedTestNo(String testNo);

    @Query("{'testInfo.courseID' : ?0, 'testInfo.schedule.testNo' : ?1}")
    Optional<ClassTestModel> findByCourseIDAndTestID(String courseID, String testID);

    Optional<ClassTestModel> findByDepartmentAndSemester(String department, String semester);
}
 