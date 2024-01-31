package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.request.PostRequest;
import com.simple.simpleboard.api.response.ApiResponse;
import com.simple.simpleboard.api.response.PostResponse;
import com.simple.simpleboard.api.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    @GetMapping("")
    public ResponseEntity<ApiResponse> getPosts (Pageable pageable) {
        return ResponseEntity.ok(postService.getPosts(pageable));
    }

    @GetMapping("/{postIdx}")
    public ResponseEntity<ApiResponse> getPost (@PathVariable int postIdx, PostRequest postRequest) {

        return null;
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> writePost (PostRequest postRequest) {
        return ResponseEntity.ok(postService.addPost(postRequest));
    }

    @PutMapping("/{postIdx}")
    public ResponseEntity<ApiResponse> updatePost (@PathVariable int postIdx, PostRequest postRequest) {

        return null;
    }

    @DeleteMapping("/{postIdx}")
    public ResponseEntity<ApiResponse> deletePost (@PathVariable int postIdx, PostRequest postRequest) {

        return null;
    }

    @GetMapping("/{postIdx}/viewcnt")
    public ResponseEntity<ApiResponse> addPostViewCnt (@PathVariable int postIdx, PostRequest postRequest) {

        return null;
    }
}
