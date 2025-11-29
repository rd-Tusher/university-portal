package com.versity.portal.versity_portal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.versity.portal.versity_portal.model.ClassroomModel;
import com.versity.portal.versity_portal.model.ClassroomModel.Announcements;
import com.versity.portal.versity_portal.model.ClassroomModel.Assignments;
import com.versity.portal.versity_portal.model.ClassroomModel.Materials;

public interface ClassroomRepository extends MongoRepository<ClassroomModel,String>{

    Optional<ClassroomModel> findByCourseID(String courseID);
    List<ClassroomModel> findByDepartmentAndSemester(String departement, String semester);


    @Query(value = "{'teacherID' : ?0}",fields = "{'roomTitle' : 1, 'courseID' : 1, 'assignments' : 1, 'announcements' : 1, 'materials' : 1,'department' : 1, 'semester':1}")
    List<RAAMProjection> findByTeacherID(String teacherID);

    @Query(value = "{'courseID' : ?0}",fields = "{'courseID' : 1, 'assignments ' : 1}")
    Optional<ExistsRoomProjection> findCourseByCourseID(String courseID);

    public interface RAAMProjection {
        String getRoomTitle();
        String getDepartment();
        String getSemester();
        String getCourseID();
        List<Assignments> getAssignments();
        List<Announcements> getAnnouncements();
        List<Materials> getMaterials();
    }
    
    public interface ExistsRoomProjection {
        String getCourseID();
        List<Assignments> getAssignments();
    }
}