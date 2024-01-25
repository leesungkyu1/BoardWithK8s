package com.simple.simpleboard.api.exception;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public abstract class GlobalException extends RuntimeException {

    public final Map<String, String> validation = new HashMap<>();

    public GlobalException(String message){
        super(message);
    }

    public abstract int getStatusCode();

    public void addValidation(String fieldName, String message){
        validation.put(fieldName, message);
    }

}
