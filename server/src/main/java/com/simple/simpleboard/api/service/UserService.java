package com.simple.simpleboard.api.service;

import com.simple.simpleboard.api.domain.User;
import com.simple.simpleboard.api.exception.UserException;
import com.simple.simpleboard.api.jwttoken.JwtUtil;
import com.simple.simpleboard.api.repository.UserRepository;
import com.simple.simpleboard.api.request.UserRequest;
import com.simple.simpleboard.api.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;
    public String login(UserRequest.LoginRequest loginRequest) {
        User user = userRepository.findByUserIdAndUserPw(loginRequest.getUserId(), loginRequest.getUserPw()).orElseThrow(UserException.CheckLoginInfo::new);
        UserRequest.UserInfo userRequest = UserRequest.UserInfo.builder()
                        .userIdx(user.getUserIdx())
                        .userName(user.getUserName())
                        .userPhone(user.getUserPhone())
                        .build();

        return jwtUtil.createToken(userRequest, "Access");
    }

    public ApiResponse saveUser(UserRequest.UserInfo userRequest) {
        ApiResponse apiResponse;
        User user = User.builder()
                .userId(userRequest.getUserId())
                .userPw(userRequest.getUserPw())
                .userPhone(userRequest.getUserPhone())
                .userName(userRequest.getUserName())
                .build();

        User validateUserId = userRepository.findByUserId(user.getUserId()).orElse(null);
        if(Objects.isNull(validateUserId)){
            userRepository.save(user);
            apiResponse = new ApiResponse();
        }else{
            apiResponse = new ApiResponse("중복된 아이디입니다.");
        }
        return apiResponse;
    }
}
