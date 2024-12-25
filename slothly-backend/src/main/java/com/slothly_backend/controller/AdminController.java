package com.slothly_backend.controller;

import com.slothly_backend.entity.User;
import com.slothly_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @DeleteMapping("/removeUser/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void removeUser(@PathVariable Long userId) {
        userService.removeUser(userId);
    }

    @PutMapping("/changeUserRole/{userId}")
    public void changeUserRole(@PathVariable Long userId, @RequestParam String newRole) {
        userService.changeUserRole(userId, newRole);
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}