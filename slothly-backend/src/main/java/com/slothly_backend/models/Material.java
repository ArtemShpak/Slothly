package com.slothly_backend.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class Material {

    private int id;
    private String name;
    private String type;
    private int price;
    private String description;
    private String author;

}
