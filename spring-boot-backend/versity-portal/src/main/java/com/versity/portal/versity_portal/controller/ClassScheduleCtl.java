package com.versity.portal.versity_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.CanceledClassModel;
import com.versity.portal.versity_portal.model.DelayClassModel;
import com.versity.portal.versity_portal.model.DelayClassModel.Request;

@RestController
public class ClassScheduleCtl {

    @Autowired
    DTFormatter dtFormatter;

    @Autowired
    MongoTemplate mongoTemplate;


    @GetMapping("cancel-class")
    public ResponseEntity<?> CancelClass(String courseID){
        try {

            Query docExists = new Query();
            docExists.addCriteria(Criteria.where("courseID").is(courseID));
            CanceledClassModel  model = mongoTemplate.findOne(docExists,CanceledClassModel.class);

            if(model != null){
                return ResponseEntity.ok("Canceled class Successfully!");
            }

            model = new CanceledClassModel();
            model.setCourseID(courseID);
            model.setExpireAt(dtFormatter.nextMidNight());

            mongoTemplate.save(model);

            return ResponseEntity.ok("saved Successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

    @PostMapping("delay-class")
    public ResponseEntity<?> delayClass(@RequestBody Request request){
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("courseID").is(request.getCourseID()));

            DelayClassModel model = mongoTemplate.findOne(query, DelayClassModel.class);
            if(model != null){
                return ResponseEntity.badRequest().body("Class alreay scheduled to Delay!");
            } 

            model = new DelayClassModel();
            model.setCourseID(request.getCourseID());
            model.setNewTime(request.getTime());
            model.setExpireAt(dtFormatter.nextMidNight());

            mongoTemplate.save(model);

            return ResponseEntity.ok("Scheduled successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured!");
            
        }
    }
    
} 