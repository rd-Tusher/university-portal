package com.versity.portal.versity_portal.controller;

import java.util.Date;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

import org.springframework.stereotype.Controller;


@Controller
public  class DTFormatter {

    String formatteddate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    public String getFormatteddate() {
        return formatteddate;
    }

    public String getDay(){
        LocalDateTime today = LocalDateTime.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        return dayOfWeek.getDisplayName(TextStyle.FULL, Locale.ENGLISH).toLowerCase();
    }

    public Date nextMidNight(){
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tonightMidnight = now.toLocalDate().plusDays(1).atStartOfDay(now.getZone());
        return Date.from(tonightMidnight.toInstant());
    }

}