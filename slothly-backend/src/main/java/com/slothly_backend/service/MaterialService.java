package com.slothly_backend.service;

import com.slothly_backend.entity.Material;
import com.slothly_backend.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public void addMaterial(Material material) {
        materialRepository.save(material);
    }

    public void removeMaterial(Long materialId) {
        materialRepository.deleteById(materialId);
    }

    public void updateMaterial(Long materialId, Material updatedMaterial) {
        Material material = materialRepository.findById(materialId)
                .orElseThrow(() -> new RuntimeException("Material not found"));
        material.setName(updatedMaterial.getName());
        material.setDescription(updatedMaterial.getDescription());
        // Set other fields as needed
        materialRepository.save(material);
    }

    public List<Material> getMaterialsByUsername(String username) {
        return materialRepository.findByAuthor(username);
    }

    public List<Material>getMaterialByType(String materialType){
        return materialRepository.findByType(materialType);
    }

}