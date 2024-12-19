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
}
