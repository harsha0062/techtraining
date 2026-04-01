package com.example.demo.service;

import com.example.demo.entity.Application;
import com.example.demo.repository.ApplicationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    // Get all documents
    public List<Application> getAllDocuments() {
        return applicationRepository.findAll();
    }

    // Get document by id
    public Optional<Application> getDocumentById(Long id) {
        return applicationRepository.findById(id);
    }

    // Count documents
    public long countDocuments() {
        return applicationRepository.count();
    }

    // Delete document
    public void deleteDocument(Long id) {
        applicationRepository.deleteById(id);
    }

    // Save application
    public Application saveApplication(Application application) {
        if (application.getStatus() == null) {
            application.setStatus("PENDING");
        }
        return applicationRepository.save(application);
    }
}