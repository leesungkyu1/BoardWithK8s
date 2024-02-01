package com.simple.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostRequest {

    private Long postIdx;

    private String postTitle;

    private String postContent;

    private Integer postViewCnt = 0;

    private Long writer;

}
