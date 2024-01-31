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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PostService {

    private final UserRepository userRepository;

    private final PostRepository postRepository;

    public ApiResponse getPosts(Pageable pageable) {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createDate"));
        Page<Post> getPosts = postRepository.findAll(pageable);

        ApiResponse response = new ApiResponse(getPosts);
        return response;
    }

    public ApiResponse getPost(PostRequest postRequest){
        PostException.NotFoundPost test = new PostException.NotFoundPost();
        Post getPost = postRepository.findById(postRequest.getPostIdx()).orElseThrow(PostException.NotFoundPost::new);

        return new ApiResponse(getPost);
    }

    public ApiResponse updatePost(PostRequest postRequest){
        Post post = setBuilderPost(postRequest);
        postRepository.save(post);
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
                .id(Math.max(postRequest.getPostIdx(), 0))
                .title(!postRequest.getPostTitle().isEmpty() ? postRequest.getPostTitle() : null)
                .content(!postRequest.getPostContent().isEmpty() ? postRequest.getPostContent() : null)
                .user(user)
                .build();
    }

    public User getUserInfo(Long userIdx){
        return userRepository.findById(userIdx).orElseThrow(UserException.NotFoundUser::new);
    }
}
