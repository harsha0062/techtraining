package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/test")
    public String testAPI(){
        return "License Management Backend Running";
    }
}