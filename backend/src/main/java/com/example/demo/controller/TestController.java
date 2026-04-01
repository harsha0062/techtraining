package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/test")
    public String testAPI(){
        return "License Management Backend Running";
    }

    @GetMapping("/")
    public String home(){
        return "License Management Backend Running at Root";
    }

    @GetMapping("/health")
    public String healthCheck(){
        return "{\"status\":\"UP\"}";
    }
}