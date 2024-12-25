package com.slothly_backend.repository;

import com.slothly_backend.entity.User;
import com.slothly_backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUserId(Long userId);
}
