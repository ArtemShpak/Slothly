package com.slothly_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Material {

    private String name;
    private String description;
    private int price;
    private String author;
    private String type;
}
