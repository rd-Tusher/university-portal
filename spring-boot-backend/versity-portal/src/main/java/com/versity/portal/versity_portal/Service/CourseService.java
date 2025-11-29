package com.versity.portal.versity_portal.Service;

import java.util.List;
import java.util.Objects;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.ComparisonOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import com.versity.portal.versity_portal.controller.DTFormatter;

@Component
public class CourseService {

    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    DTFormatter dtFormatter;

    public ResponseEntity<?> getTeacherCourse(String name){
        try {
            Query docExists = new Query();
            docExists.addCriteria(Criteria.where("courseTeacher").is(name));
            docExists.fields().include("courseID").exclude("_id");

             
            List<Document> response = mongoTemplate.find(docExists,Document.class,"course_collection");
            List<String> courseIDs = response.stream().map(doc -> doc.getString("courseID")).filter(Objects::nonNull).toList();


            Aggregation agg = Aggregation.newAggregation(

                Aggregation.match(
                    Criteria.where("courseID").in(courseIDs)
                    .and("routines.day").is(dtFormatter.getDay())
                ),

                Aggregation.project("department","semester","courseName","courseID")
                    .and(
                        ArrayOperators.Filter.filter("routines")
                            .as("r")
                            .by(ComparisonOperators.Eq.valueOf("r.day").equalToValue(dtFormatter.getDay()))
                    ).as("routines")
            );
 

            List<Document> crs = mongoTemplate.aggregate(agg, "course_collection",Document.class).getMappedResults();

            return ResponseEntity.ok(crs);
        } catch (Exception e) {
            e.printStackTrace();
           return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> getCrsNameAndId(String dept, String sem){
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem)
            );

            query.fields().include("courseID")
                .include("courseName").exclude("_id");
            
            List<Document> res = mongoTemplate.find(query,Document.class,"course_collection");


            return ResponseEntity.ok(res);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }
    public ResponseEntity<?> getStudentCourse(String dept , String sem){
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("department").is(dept)
                .and("semester").is(sem));

            query.fields().include("courseName")
                .include("courseTeacher")
                .exclude("_id");

            List<Document> res = mongoTemplate.find(query, Document.class,"course_collection");
            
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not found!");
        }
    }

    public ResponseEntity<?> getTodaysCourse(String dept , String sem){
        try {

            Aggregation agg = Aggregation.newAggregation(
                
                Aggregation.match(
                    Criteria.where("department").is(dept)
                        .and("semester").is(sem)
                        .and("routines.day").is(dtFormatter.getDay())
                ),
                Aggregation.project("courseID","courseName","courseTeacher")
                    .and(
                        ArrayOperators.Filter.filter("routines")
                            .as("r")
                            .by(ComparisonOperators.Eq.valueOf("r.day").equalToValue(dtFormatter.getDay()))
                    ).as("routine")
            );

            List<Document> res = mongoTemplate.aggregate(agg,"course_collection" ,Document.class).getMappedResults();

            return ResponseEntity.ok(res);

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data not found!");
        }
    }

}       