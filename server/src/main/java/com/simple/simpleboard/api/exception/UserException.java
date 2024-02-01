package com.simple.simpleboard.api.exception;

public class UserException extends GlobalException{
    public UserException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 500;
    }

    public static class NotFoundUser extends UserException{
        private static String MESSAGE = "유저를 찾을 수 없습니다.";
        public NotFoundUser() {
            super(MESSAGE);
        }
    }

    public static class CheckLoginInfo extends UserException{
        private static String MESSAGE = "로그인 정보를 확인하세요.";
        public CheckLoginInfo() {
            super(MESSAGE);
        }
    }
}
