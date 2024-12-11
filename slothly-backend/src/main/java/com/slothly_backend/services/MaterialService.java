package com.slothly_backend.services;

import com.github.javafaker.Faker;
import com.slothly_backend.models.Material;
import com.slothly_backend.models.User;
import com.slothly_backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class MaterialService {

    private List<Material> materials;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void loadMaterialInDB() {
        Faker faker = new Faker();
        materials = IntStream.rangeClosed(1, 20)
                .mapToObj(i -> Material.builder()
                        .id(i)
                        .name(faker.commerce().productName())
                        .author(faker.artist().name())
                        .description(faker.lorem().sentence())
                        .type(faker.commerce().material())
                        .price(faker.number().numberBetween(1, 100))
                        .build()).toList();
    }

    public List<Material> getAllMaterials() {
        return materials;
    }

    public Material getMaterialById(int id) {
        return materials.stream()
                .filter(material -> material.getId() == id)
                .findFirst()
                .orElse(null);
    }


}
