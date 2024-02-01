package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.request.UserRequest;
import com.simple.simpleboard.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simple.simpleboard.api.response.ApiResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userIdx}")
    public ResponseEntity<ApiResponse> getUser(@PathVariable int userIdx, UserRequest userRequest){
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(UserRequest.LoginRequest loginRequest, HttpServletResponse response){
        response.addCookie(new Cookie("jwtToken", userService.login(loginRequest)));
        return ResponseEntity.ok(new ApiResponse());
    }
}
