package com.versity.portal.versity_portal.controller;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.versity.portal.versity_portal.model.ClassTestModel;
import com.versity.portal.versity_portal.repository.ClassTestRepository;

@RestController
public class TestScheduleController {

    @Autowired
    ClassTestRepository classTestRepository;

    @Autowired
    JwtService jwtService;

    @Autowired
    MongoTemplate mngTemplate;





    @PostMapping("schedule-test")
    public ResponseEntity<?> scheduleTest(@RequestBody ClassTestModel clsTestModel,@CookieValue(value = "access_token") String token){
        try {
            String department = jwtService.extractDepartment(token);
            String semester = jwtService.extractSemester(token);

            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(department)
                .and("semester").is(semester)
                .and("courseID").is(clsTestModel.getCourseID())
            );

            List<ClassTestModel> model = mngTemplate.find(query,ClassTestModel.class);

            if(model != null){
                boolean dupId = model.stream().anyMatch(c -> c.getTestID().equals(clsTestModel.getTestID()));
                if(dupId){
                    return ResponseEntity.badRequest().body("Test has already scheduled with the same testID - " + clsTestModel.getTestID());
                }
            }

            // Query query2 = new Query();
            // query2.addCriteria(Criteria.where("courseID").is(clsTestModel.getCourseID()));
            // query2.fields().include("CourseTeacher")
            //     .include("department");
            
            // Document res = mngTemplate.findOne(query2, Document.class,"course_collection");
            // String tid="";
            // if(res != null){
            //     Query query3 = new Query();
            //     query3.addCriteria(Criteria.where("fullname").is(res.getString("CourseTeacher"))
            //         .and("department").is(res.getString("department"))
            //         );

            //     query3.fields().include("userID");
            //     Document res2 = mngTemplate.findOne(query3, null)
                    
            // }

            ClassTestModel newModel = new ClassTestModel(clsTestModel.getCourseID(),clsTestModel.getCourseName(),  clsTestModel.getTestDate(), clsTestModel.getTestID(), clsTestModel.getTestMark(), clsTestModel.getTestType(), "", department, semester);
            mngTemplate.save(newModel);

            return ResponseEntity.ok("Class Test scheduled successfully!");



        } catch (Exception e) { 
            return ResponseEntity.badRequest().body("Error occured. Please try again later!");
        }
    }

    @GetMapping("fetch-test-nm-id-dt")
    public ResponseEntity<?> fetchcTInfo(@CookieValue(value = "access_token") String token){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);

            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem)
            );

            query.fields().include("courseName")
                .include("testID")
                .include("testDate")
                .exclude("_id");

            List<Document> res = mngTemplate.find(query, Document.class,"test_schedule_docs");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

    @GetMapping("fetch-test-info")
    public ResponseEntity<?> getCtInfo(@CookieValue(value = "access_token") String token){
        try {
            String dept = jwtService.extractDepartment(token);
            String sem = jwtService.extractSemester(token);

            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem)
            );

            List<ClassTestModel> res = mngTemplate.find(query, ClassTestModel.class,"test_schedule_docs");
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

    // @GetMapping("fetch-test-for-teacher")
    // public ResponseEntity<?> GetTestForTeacher(@CookieValue)
}