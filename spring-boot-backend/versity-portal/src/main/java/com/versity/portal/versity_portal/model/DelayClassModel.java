package com.versity.portal.versity_portal.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document(collection = "delay-class")
public class DelayClassModel {

    @Id
    private String id;

    private String courseID;
    private String newTime;
    @Indexed(name = "expiresAt", expireAfter = "0s")
    private Date expireAt;

    public DelayClassModel(){};


    @Data
    public static class Request {
        private String courseID;
        private String time;
    }
}