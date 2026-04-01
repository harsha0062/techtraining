package com.example.demo.controller;

import com.example.demo.entity.Application;
import com.example.demo.service.ApplicationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentUploadController {

    private final ApplicationService applicationService;

    public DocumentUploadController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // 1️⃣ Get all documents
    @GetMapping
    public List<Application> getAllDocuments() {
        return applicationService.getAllDocuments();
    }

    // 2️⃣ Get document by ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getDocumentById(@PathVariable Long id) {

        return applicationService.getDocumentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3️⃣ Count documents
    @GetMapping("/count")
    public long countDocuments() {
        return applicationService.countDocuments();
    }

    // 4️⃣ Delete document
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {

        applicationService.deleteDocument(id);

        return ResponseEntity.ok("Document deleted successfully");
    }

    // 5️⃣ Upload document
    @PostMapping("/upload")
    public Application uploadDocument(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }
}