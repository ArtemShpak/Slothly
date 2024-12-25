package com.slothly_backend.service;

import com.slothly_backend.entity.Cart;
import com.slothly_backend.entity.Material;
import com.slothly_backend.entity.User;
import com.slothly_backend.repository.CartRepository;
import com.slothly_backend.repository.MaterialRepository;
import com.slothly_backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final MaterialRepository materialRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, MaterialRepository materialRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.materialRepository = materialRepository;
    }

    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public String createOrAddMaterialToCart(Long materialId) {
        User user = getAuthenticatedUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
        }
        if (addMaterialIdToCartIfNotExists(cart, materialId)) {
            cartRepository.save(cart);
            return "Material added to cart";
        } else {
            return "Material already exists in the cart";
        }
    }

    private boolean addMaterialIdToCartIfNotExists(Cart cart, Long materialId) {
        if (!cart.getMaterialIds().contains(materialId)) {
            cart.getMaterialIds().add(materialId);
            return true;
        }
        return false;
    }

    public List<Material> getCart() {
        User user = getAuthenticatedUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            return List.of();
        }
        return cart.getMaterialIds().stream()
                .map(materialRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public String removeMaterialFromCart(Long materialId) {
        User user = getAuthenticatedUser();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            return "Cart not found";
        }
        if (cart.getMaterialIds().remove(materialId)) {
            cartRepository.save(cart);
            return "Material removed from cart";
        } else {
            return "Material not found in the cart";
        }
    }
}