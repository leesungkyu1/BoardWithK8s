package com.simple.simpleboard.api.service;

import com.simple.simpleboard.api.domain.Post;
import com.simple.simpleboard.api.domain.User;
import com.simple.simpleboard.api.exception.PostException;
import com.simple.simpleboard.api.exception.UserException;
import com.simple.simpleboard.api.repository.PostRepository;
import com.simple.simpleboard.api.repository.UserRepository;
import com.simple.simpleboard.api.request.PostRequest;
import com.simple.simpleboard.api.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PostService {

    private final UserRepository userRepository;

    private final PostRepository postRepository;

    public ApiResponse getPosts(Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createDate"));
        Page<Post> posts = postRepository.findAll(pageable);
        return new ApiResponse(new PageImpl(posts.getContent(), posts.getPageable(),  posts.getTotalPages()));
    }

    public ApiResponse getPost(Long postIdx){
        return new ApiResponse(postRepository.findById(postIdx).orElseThrow(PostException.NotFoundPost::new));
    }

    public ApiResponse updatePost(PostRequest postRequest){
        postRepository.save(setBuilderPost(postRequest));
        return new ApiResponse();
    }

    public ApiResponse deletePost(Long postIdx){
        postRepository.deleteById(postIdx);
        return new ApiResponse();
    }

    public ApiResponse addPost(PostRequest postRequest){
        User user = getUserInfo(postRequest.getWriter());
        Post post = Post.builder()
                .title(!postRequest.getPostTitle().isEmpty() ? postRequest.getPostTitle() : null)
                .content(!postRequest.getPostContent().isEmpty() ? postRequest.getPostContent() : null)
                .user(user)
                .build();

        postRepository.save(post);
        return new ApiResponse();
    }

    public Post setBuilderPost(PostRequest postRequest){
        User user = getUserInfo(postRequest.getWriter());
        return Post.builder()
                .id(postRequest.getPostIdx())
                .title(!postRequest.getPostTitle().isEmpty() ? postRequest.getPostTitle() : null)
                .content(!postRequest.getPostContent().isEmpty() ? postRequest.getPostContent() : null)
                .user(user)
                .build();
    }

    public User getUserInfo(Long userIdx){
        return userRepository.findById(userIdx).orElseThrow(UserException.NotFoundUser::new);
    }
}
