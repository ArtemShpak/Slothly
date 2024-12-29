// MaterialService.java
package com.slothly_backend.service;

import com.slothly_backend.dto.MaterialDTO;
import com.slothly_backend.entity.Material;
import com.slothly_backend.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Transactional
    public List<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public void addMaterial(Material material) {
        materialRepository.save(material);
    }

    @Transactional
    public void removeMaterial(Long materialId) {
        materialRepository.deleteById(materialId);
    }

    @Transactional
    public void updateMaterial(Long materialId, Material updatedMaterial) {
        Material material = materialRepository.findById(materialId)
                .orElseThrow(() -> new RuntimeException("Material not found"));
        if (updatedMaterial.getName() != null)
        {
            material.setName(updatedMaterial.getName());
        }
        if (updatedMaterial.getDescription() != null)
        {
            material.setDescription(updatedMaterial.getDescription());
        }
        if (updatedMaterial.getPrice() != 0)
        {
            material.setPrice(updatedMaterial.getPrice());
        }
        if (updatedMaterial.getType() != null)
        {
            material.setType(updatedMaterial.getType());
        }
        material.setAuthor(updatedMaterial.getAuthor());
        materialRepository.save(material);
    }

    @Transactional
    public List<MaterialDTO> getMaterialsByUsername(String username) {
        return materialRepository.findByAuthor(username).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<Material> getMaterialByType(String materialType) {
        return materialRepository.findByType(materialType);
    }

    private MaterialDTO convertToDTO(Material material) {
        MaterialDTO dto = new MaterialDTO();
        dto.setId(material.getId());
        dto.setName(material.getName());
        dto.setDescription(material.getDescription());
        dto.setPrice(material.getPrice());
        dto.setType(material.getType());
        dto.setAuthor(material.getAuthor());
        if (material.getPhoto() != null) {
            dto.setPhoto(Base64.getEncoder().encodeToString(material.getPhoto()));
        } else {
            dto.setPhoto(null);
        }
        return dto;
    }

    public Material getMaterialById(Long materialId) {
        return materialRepository.findById(materialId)
                .orElseThrow(() -> new RuntimeException("Material not found"));
    }
}