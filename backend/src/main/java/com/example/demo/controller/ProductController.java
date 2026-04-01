package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allow React frontend to access
public class ProductController {

    @GetMapping
    public List<Map<String, Object>> getProducts() {
        return Arrays.asList(
                Map.of("id", 1, "name", "Apple Watch Series 9", "tag", "Smarter. Brighter. Mightier.", "type", "dark"),
                Map.of("id", 2, "name", "MacBook Pro", "tag", "Mind-blowing. Head-turning.", "type", "dark"),
                Map.of("id", 3, "name", "iPad Pro", "tag", "Supercharged by M2.", "type", "light"),
                Map.of("id", 4, "name", "AirPods Pro", "tag", "Adaptive Audio. Now playing.", "type", "light"));
    }
}
