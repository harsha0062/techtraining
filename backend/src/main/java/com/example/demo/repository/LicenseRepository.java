package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.License;

import java.util.List;

@Repository
public interface LicenseRepository extends JpaRepository<License, Long> {

    // Get all licenses by user id
    List<License> findByUserId(Long userId);

}