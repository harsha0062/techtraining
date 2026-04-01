package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

}