package com.simple.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;

public class UserRequest {

    @Getter
    public static class LoginRequest{
        private String userId;

        private String userPw;
    }

    @Getter
    @Builder
    public static class UserInfo extends LoginRequest{
        private Long userIdx;
        private String userName;
        private String userPhone;
    }
}
