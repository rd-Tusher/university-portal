package com.versity.portal.versity_portal.repository;
import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.StudentModel;

@Repository
public interface StudentRepository extends MongoRepository<StudentModel,String>{

    Optional<StudentModel> findByUserID(String userID);
    List<StudentModel> findByDepartmentAndSemester(String department, String semester);

    @Query(value = "{'department': ?0 , 'semester' : ?1}", fields = "{'username' : 1, 'userID' : 1}")
    List<NameIDProjection> getInfoByDeptAndSem(String department, String semester);

    public interface NameIDProjection {
        String getUsername();
        String getStudentID();
        
    }
} 