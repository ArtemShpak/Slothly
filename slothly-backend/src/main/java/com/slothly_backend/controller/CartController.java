package com.slothly_backend.controller;

import com.slothly_backend.entity.Cart;
import com.slothly_backend.entity.Material;
import com.slothly_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/addMaterialInCart")
    public String createOrAddMaterialToCart(@RequestBody Material material) {
        Long id = material.getId();
        return cartService.createOrAddMaterialToCart(id);
    }

    @GetMapping("/cart")
    public List<Material> getCart() {
        return cartService.getCart();
    }

    @DeleteMapping("/removeMaterialFromCart/{materialId}")
    public String removeMaterialFromCart(@PathVariable Long materialId) {
        return cartService.removeMaterialFromCart(materialId);
    }
}