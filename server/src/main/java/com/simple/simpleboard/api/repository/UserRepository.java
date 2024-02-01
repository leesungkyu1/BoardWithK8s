package com.simple.simpleboard.api.repository;

import com.simple.simpleboard.api.domain.User;
import com.simple.simpleboard.api.request.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserIdAndUserPw(String userId, String userPw);
}
