// src/main/java/com/slothly_backend/service/UserInfoService.java
package com.slothly_backend.service;

import com.slothly_backend.entity.User;
import com.slothly_backend.entity.UserInfo;
import com.slothly_backend.repository.UserInfoRepository;
import com.slothly_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    public UserInfo getUserDetails() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return user.getUserDetails();
        }
        return null;
    }

    public void saveUserInfo(UserInfo userInfo) {
        UserInfo existingUserInfo = userInfoRepository.findByUserId(userInfo.getUser().getId());
        if (existingUserInfo != null) {
            existingUserInfo.setDescription(userInfo.getDescription());
            existingUserInfo.setFirstName(userInfo.getFirstName());
            existingUserInfo.setLastName(userInfo.getLastName());// Update fields as needed
            userInfoRepository.save(existingUserInfo);
        } else {
            userInfoRepository.save(userInfo);
        }
    }
}