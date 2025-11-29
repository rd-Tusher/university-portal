package com.versity.portal.versity_portal.model;

import java.util.List;
import java.util.Date;

public class Topics {

    private Date date;
    private List<String> topicList;

    public Topics(){
        this.date = new Date();
    }

    public Topics(List<String> topicList){
        this.topicList = topicList;
        this.date = new Date();
    }
    public List<String> getTopicList() {
        return topicList;
    }
    public Date getDate() {
        return date;
    }
    
}