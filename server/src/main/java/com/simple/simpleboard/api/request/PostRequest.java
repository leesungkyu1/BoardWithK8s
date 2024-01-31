package com.simple.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostRequest {

    private Long postIdx;

    private String postTitle;

    private String postContent;

    private int postViewCnt = 0;

    private Long writer;

}
