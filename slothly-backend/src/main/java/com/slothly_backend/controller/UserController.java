package com.slothly_backend.controller;

import com.slothly_backend.models.User;
import com.slothly_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.Authenticator;
import java.util.List;

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

    @PostMapping("/sign-up")
    public ResponseEntity<String> newUser(@RequestBody User user) {
        userService.addUser(user);
        String responseText = "User " + user.getName() + " added successfully";
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Content-Type", "application/json")
                .body(responseText);
    }

    @GetMapping("/all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}
