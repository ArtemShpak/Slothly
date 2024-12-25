package com.slothly_backend.service;

import com.slothly_backend.entity.User;
import com.slothly_backend.entity.UserInfo;
import com.slothly_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoService userInfoService;

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public void saveUser(User user) {
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        userRepository.save(user);

        // Check if UserInfo exists, if not create a new one
        if (user.getUserDetails() == null) {
            UserInfo userInfo = new UserInfo();
            userInfo.setUser(user);
            userInfoService.saveUserInfo(userInfo);
        }
    }

    public void removeUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void changeUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
