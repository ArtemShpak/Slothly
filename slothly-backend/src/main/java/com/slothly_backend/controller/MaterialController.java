package com.slothly_backend.controller;

import com.slothly_backend.entity.Material;
import com.slothly_backend.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/materials")
    public List<Material> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @PostMapping("/addMaterial")
    public void addMaterial(@RequestBody Material material) {
        materialService.addMaterial(material);
    }

}