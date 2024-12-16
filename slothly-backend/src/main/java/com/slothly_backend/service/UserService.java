package com.slothly_backend.service;

import com.slothly_backend.entity.User;
import com.slothly_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public void saveUser(User user) {
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }
}
