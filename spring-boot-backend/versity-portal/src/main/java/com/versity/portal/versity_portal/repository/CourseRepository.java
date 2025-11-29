package com.versity.portal.versity_portal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.versity.portal.versity_portal.model.CourseModel;

@Repository
public interface CourseRepository  extends MongoRepository<CourseModel,String>{
    Optional<CourseModel> findByDepartmentAndSemesterAndCourseID(String department,String semester,String courseID);
    List<CourseModel> findByDepartmentAndSemester(String department,String semester);

    @Query(value = "{'department' : ?0, 'semester' : ?1}", fields = "{'courseName : 1', 'courseID' : 1}")
    List<CourseProjection> findCourseByDepartmentAndSemester(String department, String semester);

    @Query(value = "{'courseTeacher' : ?0}" , fields = "{'courseName' : 1, 'courseID' : 1}")
    List<CourseProjection> findByCourseTeacher(String courseTeacher);

    @Query(value = "{'courseID' : ?0}" , fields = "{'department' : 1, 'semester' : 1,'courseTeacher' : 1}")
    Optional<DepSemTeachPrejection> findByCourseID(String courseID);

    public interface CourseProjection {
        String getCourseID();
        String getCourseName();
    }

    public interface DepSemTeachPrejection {
        String getDepartment();
        String getSemester();
        String getCourseTeacher();
        
    }

    
}


