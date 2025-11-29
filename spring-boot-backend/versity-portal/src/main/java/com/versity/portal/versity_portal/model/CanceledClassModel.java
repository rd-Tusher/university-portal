package com.versity.portal.versity_portal.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection ="canceled_class")
public class CanceledClassModel {

    @Id
    private String id;

    private String courseID;
    @Indexed(name = "expireAt", expireAfter = "0s")
    private Date expireAt;

    public CanceledClassModel (){};
    
}