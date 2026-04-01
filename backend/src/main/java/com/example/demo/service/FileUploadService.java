package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileUploadService {

	private final String uploadDir = "C:/uploads/";

    public String saveFile(MultipartFile file) throws IOException {

        // create uploads directory if not exists
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + File.separator + file.getOriginalFilename();

        File dest = new File(filePath);

        file.transferTo(dest);

        return filePath;
    }
}