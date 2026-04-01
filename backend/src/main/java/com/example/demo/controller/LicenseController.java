package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.entity.License;
import com.example.demo.service.LicenseService;

@RestController
@RequestMapping("/license")
public class LicenseController {

    @Autowired
    private LicenseService licenseService;

    @PostMapping("/apply")
    public License applyLicense(@RequestBody License license){
        return licenseService.applyLicense(license);
    }

    @GetMapping("/all")
    public List<License> getLicenses(){
        return licenseService.getAllLicenses();
    }
    @GetMapping("/verify")
    public String verifyLicenseController() {
        return "License Controller Working";
    }
    @GetMapping("/count")
    public long countLicenses() {
        return licenseService.getAllLicenses().size();
    }
    
}