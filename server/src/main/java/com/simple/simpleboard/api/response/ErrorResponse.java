package com.simple.simpleboard.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

/**
 * {
 *     "code": "400",
 *     "message": "잘못된 요청입니다."
 *     "validation": {
 *         "title": "값을 입력하세요"
 *     }
 * }
 */
@Getter
public class ErrorResponse {

    private final String code;
    private final String message;
    private final Map<String, String> validation;

    @Builder
    public ErrorResponse(String code, String message, Map<String, String> validation) {
        this.code = code;
        this.message = message;
        this.validation = validation;
    }

    public void addValidation(String fieldName, String errorMessage) {
        this.validation.put(fieldName, errorMessage);
    }
}
