package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

@RestController
@CrossOrigin

public class TimeController {
    @Autowired
    WebApplicationContext applicationContext;

    @GetMapping(value = "/getTime")
    public int GetTime() {
        TimeService timeService = applicationContext.getBean(TimeService.class);
        return timeService.UpdateTime();
    }
}
