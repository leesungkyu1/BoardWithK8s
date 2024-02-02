package com.simple.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class UserRequest {

    @Getter
    public static class LoginRequest{
        @NotBlank(message = "아이디는 필수값입니다.")
        private String userId;

        @NotBlank(message = "비밀번호는 필수값입니다.")
        private String userPw;
    }

    @Getter
    @Builder
    public static class UserInfo extends LoginRequest{
        private Long userIdx;

        @NotBlank(message = "사용자 이름은 필수값입니다.")
        private String userName;

        @NotBlank(message = "사용자 전화번호는 필수값입니다.")
        private String userPhone;
    }
}
