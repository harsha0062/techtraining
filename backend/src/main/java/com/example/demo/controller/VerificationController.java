package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerificationController {

    @GetMapping("/verify")
    public String verify() {
        return "License Management System Backend Working!";
    }

}