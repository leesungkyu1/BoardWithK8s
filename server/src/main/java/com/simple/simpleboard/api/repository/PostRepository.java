package com.simple.simpleboard.api.repository;

import com.simple.simpleboard.api.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
