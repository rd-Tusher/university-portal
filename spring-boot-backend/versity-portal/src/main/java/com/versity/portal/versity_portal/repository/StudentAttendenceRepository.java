package com.versity.portal.versity_portal.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.versity.portal.versity_portal.model.StudentAttendenceModel;

public interface StudentAttendenceRepository extends MongoRepository<StudentAttendenceModel,String> {

    List<StudentAttendenceModel> findByDepartmentAndSemester(String department,String semester);

    @Aggregation(pipeline = {
        "{$match: { 'department': ?0, 'semester': ?1 }}",
        "{$unwind: '$courses'}",
        "{$match: { 'courses.courseID': ?2 }}",
        "{$project: { userID : 1, courseID: '$courses.courseID', classAtten: '$courses.classAtten',classAbsent : '$courses.classAbsent' ,updatedAt : '$courses.updatedAt'}}"
    })
    List<CourseAttendanceProjection> findCourseAttendanceByDeptAndSemesterAndCourseID(String dept, String sem, String courseID);


    public interface CourseAttendanceProjection {
        String getCourseID();
        Integer getClassAtten();
        Integer getClassAbsent();
        String getStudentID();
        String getUpdatedAt();
    }

}

