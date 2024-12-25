package com.slothly_backend.controller;

import com.slothly_backend.entity.Material;
import com.slothly_backend.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/materials")

    public List<Material> getMaterialsByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return materialService.getMaterialsByUsername(username);
    }

    @PostMapping("/addMaterial")
    public void addMaterial(@RequestBody Material material) {
        materialService.addMaterial(material);
    }

    @DeleteMapping("/removeMaterial/{materialId}")
    public void removeMaterial(@PathVariable Long materialId) {
        materialService.removeMaterial(materialId);
    }

    @PutMapping("/updateMaterial/{materialId}")
    public void updateMaterial(@PathVariable Long materialId, @RequestBody Material material) {
        materialService.updateMaterial(materialId, material);
    }

}