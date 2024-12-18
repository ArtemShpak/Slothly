package com.slothly_backend.controller;

import com.slothly_backend.bean.AuthenticationBean;
import com.slothly_backend.entity.User;
import com.slothly_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class BasicAuthController {

    @Autowired
    private UserService userService;

    @GetMapping(path = "/basicauth")
    public AuthenticationBean helloWorldBean() {
        return new AuthenticationBean("You are authenticated");
    }

    @PostMapping(path = "/register")
    public AuthenticationBean register(@RequestBody User user) {
        userService.saveUser(user);
        return new AuthenticationBean("User registered successfully");
    }
}