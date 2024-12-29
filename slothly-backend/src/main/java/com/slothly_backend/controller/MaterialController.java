package com.slothly_backend.controller;

import com.slothly_backend.dto.MaterialDTO;
import com.slothly_backend.entity.Material;
import com.slothly_backend.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/materials")

    public List<MaterialDTO> getMaterialsByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return materialService.getMaterialsByUsername(username);
    }


    @PostMapping("/addMaterial")
    public void addMaterial(@RequestParam("name") String name,
                            @RequestParam("description") String description,
                            @RequestParam("price") int price,
                            @RequestParam("type") String type,
                            @RequestParam("author") String author,
                            @RequestParam("photo") MultipartFile photo) throws IOException {
        Material material = new Material();
        material.setName(name);
        material.setDescription(description);
        material.setPrice(price);
        material.setType(type);
        material.setAuthor(author);
        material.setPhoto(photo.getBytes());
        materialService.addMaterial(material);
    }

    @DeleteMapping("/removeMaterial/{materialId}")
    public void removeMaterial(@PathVariable Long materialId) {
        materialService.removeMaterial(materialId);
    }


    @PutMapping("/updateMaterial/{materialId}")
    public void updateMaterial(@PathVariable Long materialId, @RequestParam("name") String name,
                               @RequestParam("description") String description,
                               @RequestParam("price") int price,
                               @RequestParam("photo") MultipartFile photo) throws IOException {
        Material existingMaterial = materialService.getMaterialById(materialId);
        if (name != null) {
            existingMaterial.setName(name);
        }
        if (description != null) {
            existingMaterial.setDescription(description);
        }
        if (price != 0) {
            existingMaterial.setPrice(price);
        }
        if (photo != null) {
            existingMaterial.setPhoto(photo.getBytes());
        }
        materialService.updateMaterial(materialId, existingMaterial);
    }

    @GetMapping("/allMaterials")
    public List<MaterialDTO> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @GetMapping("/material/{materialType}")
    public List<Material> getMaterialsByType(@PathVariable String materialType) {
        return materialService.getMaterialByType(materialType);
    }

}