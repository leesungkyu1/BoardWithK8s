package com.simple.simpleboard.api.response;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class ApiResponse {
    private Object data = null;
    private String message = "";
    private boolean success = true;

    public ApiResponse(String message, boolean success){
        this.message = message;
        this.success = success;
    }

    public ApiResponse(Object data) {
        this.data = data;
    }

    public ApiResponse(){
        this.message = "데이터 변경을 성공하였습니다.";
    }
}
