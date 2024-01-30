package com.simple.simpleboard.api.response;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class ApiResponse<K, V> {
    private Object data = null;
    private String message = "";
    private boolean success = true;
    private Map<String, Object> pageInfo = new HashMap<>();



//    public ApiResponse(String message){
//        this.message = message;
//        this.success = false;
//    }
//
//    public ApiResponse(Map<K, V> data) {
//        this.data = data;
//    }
//
//    public ApiResponse(Page page){
//        // Page
//        this.data = getListData(page.getPageable());
//
//    }
//
//    public Object getListData(Pageable pageable){
////        this.date = pageable;
//        this.data = page
//    }


}
