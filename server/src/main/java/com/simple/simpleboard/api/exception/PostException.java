package com.simple.simpleboard.api.exception;

public class PostException extends GlobalException{
    public PostException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 500;
    }

    public static class NotFoundPost extends PostException{
        private static String MESSAGE = "게시글을 찾을 수 없습니다.";
        public NotFoundPost() {
            super(MESSAGE);
        }
    }
}
