package com.simple.simpleboard.api.controller;

import com.simple.simpleboard.api.exception.GlobalException;
import com.simple.simpleboard.api.exception.UserException;
import com.simple.simpleboard.api.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserException.CheckLoginInfo.class)
    public ResponseEntity<ErrorResponse> invalidRequestException(UserException.CheckLoginInfo e) {
        ErrorResponse body = ErrorResponse.builder()
                .code("400")
                .message("아이디 및 비밀번호를 확인해주세요")
                .build();

        return ResponseEntity.status(400).body(body);
    }

    @ResponseBody
    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponse> GlobalException(GlobalException e) {
        ErrorResponse body = ErrorResponse.builder()
                .code(String.valueOf(e.getStatusCode()))
                .message(e.getMessage())
                .validation(e.getValidation())
                .build();

        ResponseEntity<ErrorResponse> response = ResponseEntity.status(e.getStatusCode())
                .body(body);

        return response;
    }
}
