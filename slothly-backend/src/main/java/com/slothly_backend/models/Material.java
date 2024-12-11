package com.slothly_backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
public class Material {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String type;
    private int price;
    private String description;
    private String author;
}
