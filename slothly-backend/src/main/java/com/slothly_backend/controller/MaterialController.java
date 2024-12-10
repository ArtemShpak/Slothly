package com.slothly_backend.controller;

import com.slothly_backend.models.Material;
import com.slothly_backend.models.User;
import com.slothly_backend.services.MaterialService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/material")
@AllArgsConstructor
public class MaterialController {

    private MaterialService materialService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to the Material Controller";
    }

    @GetMapping("/all-materials")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Material> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @GetMapping("/{id}")
    public Material getMaterialById(@PathVariable int id) {
        return materialService.getMaterialById(id);
    }

    @PostMapping("/new-user")
    public String newUser(@RequestBody User user) {
        materialService.addUser(user);
        return "User added successfully";
    }
}
