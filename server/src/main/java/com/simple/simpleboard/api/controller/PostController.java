package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.request.PostRequest;
import com.simple.simpleboard.api.response.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/post")
public class PostController {

    @GetMapping("")
    public ResponseEntity<Page<List<PostResponse>>> getPosts (Pageable pageable, PostRequest postRequest) {

        return null;
    }
}
