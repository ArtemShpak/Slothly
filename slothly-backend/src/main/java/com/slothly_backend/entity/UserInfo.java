package com.slothly_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference// Внешний ключ для связи с User
    private User user;  // Связь один к одному с User
}

