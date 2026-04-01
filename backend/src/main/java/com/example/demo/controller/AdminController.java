package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @PostMapping("/approve/{id}")
    public Map<String,String> approveLicense(@PathVariable int id){

        Map<String,String> response = new HashMap<>();

        response.put("licenseId", String.valueOf(id));
        response.put("status","APPROVED");

        return response;
    }

    @PostMapping("/reject/{id}")
    public Map<String,String> rejectLicense(@PathVariable int id){

        Map<String,String> response = new HashMap<>();

        response.put("licenseId", String.valueOf(id));
        response.put("status","REJECTED");

        return response;
    }
}	