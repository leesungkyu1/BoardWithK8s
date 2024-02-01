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
    public ResponseEntity<ApiResponse> getPost (@PathVariable Long postIdx) {
        return ResponseEntity.ok(postService.getPost(postIdx));
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> writePost (@RequestBody PostRequest postRequest) {
        return ResponseEntity.ok(postService.addPost(postRequest));
    }

    @PutMapping("/{postIdx}")
    public ResponseEntity<ApiResponse> updatePost (@PathVariable Long postIdx, @RequestBody PostRequest postRequest) {
        postRequest.setPostIdx(postIdx);
        return ResponseEntity.ok(postService.updatePost(postRequest));
    }

    @DeleteMapping("/{postIdx}")
    public ResponseEntity<ApiResponse> deletePost (@PathVariable Long postIdx) {
        return ResponseEntity.ok(postService.deletePost(postIdx));
    }
}
