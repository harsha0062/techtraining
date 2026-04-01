package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.License;
import com.example.demo.repository.LicenseRepository;

import java.util.List;

@Service
public class LicenseService {

    @Autowired
    private LicenseRepository licenseRepository;

    // Apply license
    public License applyLicense(License license) {
        license.setStatus("PENDING");
        return licenseRepository.save(license);
    }

    // Get all licenses
    public List<License> getAllLicenses() {
        return licenseRepository.findAll();
    }

    // Get license by id
    public License getLicenseById(Long id) {
        return licenseRepository.findById(id).orElse(null);
    }

    // Get licenses by user
    public List<License> getLicensesByUser(Long userId) {
        return licenseRepository.findByUserId(userId);
    }

    // Approve license
    public License approveLicense(Long id) {
        License license = licenseRepository.findById(id).orElse(null);
        if (license != null) {
            license.setStatus("APPROVED");
            return licenseRepository.save(license);
        }
        return null;
    }
}