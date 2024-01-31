package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.request.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simple.simpleboard.api.response.ApiResponse;
import com.simple.simpleboard.api.response.UserResponse;
import org.springframework.http.ResponseEntity;

import java.awt.print.Pageable;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/{userIdx}")
    public ResponseEntity<?> getUser(@PathVariable int userIdx, UserRequest userRequest){
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(UserRequest.LoginRequest LoginRequest){
        return null;
    }

}
