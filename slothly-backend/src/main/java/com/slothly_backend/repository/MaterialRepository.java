package com.slothly_backend.repository;

import com.slothly_backend.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByAuthor(String author);
}