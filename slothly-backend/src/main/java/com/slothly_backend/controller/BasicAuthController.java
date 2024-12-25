package com.slothly_backend.controller;

import com.slothly_backend.bean.AuthenticationBean;
import com.slothly_backend.entity.User;
import com.slothly_backend.entity.UserInfo;
import com.slothly_backend.repository.UserRepository;
import com.slothly_backend.service.UserInfoService;
import com.slothly_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class BasicAuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping(path = "/basicauth")
    public AuthenticationBean helloWorldBean() {
        return new AuthenticationBean("You are authenticated");
    }

    @PostMapping(path = "/register")
    public AuthenticationBean register(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return new AuthenticationBean("Username already exists");
        }
        else {
            userService.saveUser(user);
        }
        return new AuthenticationBean("User registered successfully");
    }
    @GetMapping("/profile")
    public UserInfo getUserInfo() {
        String user_role = SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
        System.out.println(user_role);
        return userInfoService.getUserDetails();
    }

    @PutMapping("/profile")
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo userInfo) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);

        if (user != null) {
            userInfo.setUser(user);
            userInfoService.saveUserInfo(userInfo);
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}