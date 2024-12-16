// src/main/java/com/example/demo/repository/UserRepository.java
package com.slothly_backend.repository;

import com.slothly_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    com.slothly_backend.entity.User findByUsername(String username);
}