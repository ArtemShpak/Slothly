package com.slothly_backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MaterialDTO {
    private Long id;
    private String name;
    private String description;
    private Integer price;
    private String type;
    private String author;
    private String photo;
}