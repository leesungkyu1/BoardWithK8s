package com.simple.simpleboard.api.repository;

import com.simple.simpleboard.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
}
