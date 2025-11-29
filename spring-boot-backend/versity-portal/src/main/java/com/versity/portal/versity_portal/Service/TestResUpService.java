package com.versity.portal.versity_portal.Service;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.versity.portal.versity_portal.model.TestResultModel;
import com.versity.portal.versity_portal.model.TestResultModel.ResultModel;

@Component
public class TestResUpService {

    @Autowired 
    MongoTemplate mongoTemplate;

    public ResponseEntity<?> getStudentInfo(String dept, String sem){
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem)
            );
            query.fields().include("userID")
                .include("fullname")
                .exclude("_id");

            List<Document> res = mongoTemplate.find(query, Document.class,"student_collection");

            return  ResponseEntity.ok(res);
        } catch (Exception e) {
            return  ResponseEntity.badRequest().body("Error Occured!");
            
        }
    }

    public ResponseEntity<?> saveTestResult(String dept, String sem, String courseID, String testID, List<ResultModel> results){
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem)
                .and("courseID").is(courseID)
                .and("testID").is(testID)
            );

            TestResultModel res = mongoTemplate.findOne(query, TestResultModel.class);
            if(res == null){
                res = new TestResultModel(dept, sem, courseID, testID, results);
            }
            else {
                res.setTestResults(results);
            }
            mongoTemplate.save(res);

            return ResponseEntity.ok("Result updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }
    
}