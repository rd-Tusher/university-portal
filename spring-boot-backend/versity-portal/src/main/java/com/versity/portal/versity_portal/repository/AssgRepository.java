package com.versity.portal.versity_portal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;

import com.versity.portal.versity_portal.model.AssgSubModel;

public interface AssgRepository extends MongoRepository<AssgSubModel,String>{

    // @Query( value = "{'department' : ?0, 'semester' : ?1, 'courseID' : ?2}", fields="{'department' : 1, 'semester' : 1, 'courseID' : 1}")
    // Optional<getDSC> findByDepartmentAndSemesterAnDCourseID(String department, String semester, String cousrsID);
    Optional<AssgSubModel> findByDepartmentAndSemesterAndCourseID(String department, String semester, String cousrsID);

    @Aggregation(pipeline = {
        "{$match : {'department' : ?0, 'semester' : ?1, 'courseID' : ?2}}",
        "{$unwind : '$submissions'}",
        "{$match : {'submissions.assgId' : ?3}}",
        "{$project : {'assgId' : '$submissions.assgId', 'students' : '$submissions.students'}}"
    })
    Optional<SubmissionPorjection> findByDepartmentAndSemesterAndCourseIDAndAssgID(String department, String semester, String courseID, String AssID);

    
    // public interface getDSC {
    //     String getDepartmet();
    //     String getSemester();
    //     String getCourseID();
    // }
    
    public interface SubmissionPorjection{
        String getAssgId();
        List<StudentProjection> getStudents();

    }
    public interface StudentProjection {
        String getStudentID();
        List<String> getFile();
        
    }
}