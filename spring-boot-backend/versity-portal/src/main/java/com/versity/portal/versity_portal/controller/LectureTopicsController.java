package com.versity.portal.versity_portal.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.model.TopicCourseModel;
import com.versity.portal.versity_portal.model.TopicModel;
import com.versity.portal.versity_portal.repository.TopicModelRepository;

@RestController
public class LectureTopicsController {

    @Autowired
    TopicModelRepository topicModelRepository;
    @PostMapping("/save-lecture-topics")
    public ResponseEntity<?> SaveLectureTopic(@RequestBody TopicModel topicModel){
        try {
            Optional<TopicModel> exisDoc = topicModelRepository.findByDepartmentAndSemester(topicModel.getDepartment(),topicModel.getSemester());
            if(exisDoc.isPresent()){
                for(TopicCourseModel exisDocCrs : exisDoc.get().getTopicCourseModel()){
                    if(exisDocCrs.getCourseID().equals(topicModel.getTopicCourseModel().get(0).getCourseID())){
                        exisDocCrs.getTopics().addAll(topicModel.getTopicCourseModel().get(0).getTopics());
                        topicModelRepository.save(exisDoc.get());
                        return ResponseEntity.ok().body("Data saved successfully!");
                    }
                }
                exisDoc.get().getTopicCourseModel().addAll(topicModel.getTopicCourseModel());
                topicModelRepository.save(exisDoc.get());
            }
            else {
                TopicModel savedRes = new TopicModel(topicModel.getDepartment(), topicModel.getSemester(), topicModel.getTopicCourseModel());
                topicModelRepository.save(savedRes);
            }
            return ResponseEntity.ok().body(topicModel.getTopicCourseModel());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("docuemnt not found");
        }
    }
}