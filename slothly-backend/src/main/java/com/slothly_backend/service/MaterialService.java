package com.slothly_backend.service;

import com.slothly_backend.entity.Material;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Getter
@Service
public class MaterialService {

    List<Material> materials = new ArrayList<>();

    public void addMaterial(Material material) {
        materials.add(material);
    }

    public void loadMaterials() {
        materials.add(new Material("Material", "Material description", 100, "Author", "Texture"));
        materials.add(new Material("Material2", "Material description2", 200, "Author2", "Texture2"));
        materials.add(new Material("Material3", "Material description3", 300, "Author3", "Texture3"));
        materials.add(new Material("Material4", "Material description4", 400, "Author4", "Texture4"));
    }
}
