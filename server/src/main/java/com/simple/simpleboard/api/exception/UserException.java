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
}
