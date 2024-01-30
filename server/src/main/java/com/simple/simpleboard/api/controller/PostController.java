package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.request.PostRequest;
import com.simple.simpleboard.api.response.ApiResponse;
import com.simple.simpleboard.api.response.PostResponse;
import com.simple.simpleboard.api.response.UserResponse;
import com.simple.simpleboard.api.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<String, List<UserResponse>>> getPostList(Pageable pageable){
        List<PostResponse> getPosts = postService.getPostList();
        return null;
    }

}
