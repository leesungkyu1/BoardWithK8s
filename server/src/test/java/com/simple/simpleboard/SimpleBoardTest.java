package com.simple.simpleboard;

import com.simple.simpleboard.api.request.PostRequest;
import com.simple.simpleboard.api.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SimpleBoardTest {

    @Autowired
    PostService postService;

    @DisplayName("게시글 추가 테스트")
    @Test
    public void insertSamplePost(){
        for(int i=0; i<10000; i++){
            PostRequest postRequest = PostRequest.builder()
                            .postContent("testtest"+i)
                            .postTitle("title"+i)
                            .writer(1L)
                            .build();

            postService.addPost(postRequest);
        }

    }
}
