package com.slothly_backend.controller;

import com.slothly_backend.models.User;
import com.slothly_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.Authenticator;

@RestController
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public User getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return userService.getUserByName(currentPrincipalName);
    }

    @GetMapping("/remove")
    public String removeUser () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userService.getUserByName(currentPrincipalName);
        userService.deleteUserAndLogout(user.getId());
        return "User removed successfully";
    }

    @PostMapping("/new-user")
    public String newUser(@RequestBody User user) {
        userService.addUser(user);
        return "User added successfully";
    }
}
