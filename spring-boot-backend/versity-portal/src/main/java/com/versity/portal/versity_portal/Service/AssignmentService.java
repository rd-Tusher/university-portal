package com.versity.portal.versity_portal.Service;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import com.versity.portal.versity_portal.Utility.AssgUtility;
import com.versity.portal.versity_portal.model.AssgSubModel;
import com.versity.portal.versity_portal.model.AssgSubModel.Submission;
import com.versity.portal.versity_portal.model.AssgSubModel.Submission.Student;

@Controller
public class AssignmentService {

    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    private AssgUtility assgUtility;

    public ResponseEntity<?> submitAssignment(String department, String semester, String courseID, String assgId, String studentID, MultipartFile[] files , String token){

        try {
            Query docExists = new Query();
            docExists.addCriteria(Criteria.where("department").is(department)
                .and("semester").is(semester)
                .and("courseID").is(courseID));

            
            AssgSubModel assignment = mongoTemplate.findOne(docExists, AssgSubModel.class);

            if(assignment == null){
                assignment = new AssgSubModel(department, semester, courseID);
            }

            Submission submission = assignment.getSubmissions()
            .stream()
            .filter(sub -> sub.getAssgId().equals(assgId))
            .findFirst()
            .orElse(null);

            if(submission == null){
                submission = new Submission(assgId);
                assignment.getSubmissions().add(submission);
            }


            Student student = submission.getStudents()
            .stream()
            .filter(stu -> stu.getStudentID().equals(studentID))
            .findFirst()
            .orElse(null);
            
            if(student == null){
                student = new Student(studentID);
                submission.getStudents().add(student);
            }

            Set<String> newFiles = new HashSet<>(student.getFile());
            if(files != null){
                for (MultipartFile file : files) {
                    String fileUrl="";
                    if(file != null){
                        fileUrl = assgUtility.saveFile(file, courseID, studentID, "Assignments");
                        newFiles.add(fileUrl);
                    }
                }
            }
            
            if(student.getFile() == null){
                student.setFile(new ArrayList<>());
            }
            
            student.setFile(new ArrayList<>(newFiles));

            mongoTemplate.save(assignment);
            
            return ResponseEntity.ok("Assignment saved successfylly!");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occured!" + e.getMessage());
        }
    }

    public ResponseEntity<?> getStudentSubmit(String department, String semester, String courseID,String assgId){
        try {
            Query docExists =new  Query();
            docExists.addCriteria(Criteria.where("department").is(department)
            .and("semester").is(semester)
            .and("courseID").is(courseID));

            AssgSubModel assignment = mongoTemplate.findOne(docExists,AssgSubModel.class);

            if(assignment == null){
                return ResponseEntity.notFound().build();
            }

            Submission submission = assignment.getSubmissions().stream()
            .filter(assg -> assg.getAssgId().equals(assgId))
            .findFirst()
            .orElse(null);


            return ResponseEntity.ok(submission.getStudents());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}