package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.dto.post.CommentListResponse;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.CommentRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
@Slf4j
public class CommentService {

  private final CommentRepository commentRepository;
  private final PostRepository postRepository;

  @Transactional
  public Long saveComment(CommentRequest commentRequest, User user, Long postId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. postId=" + postId));
    Comment comment = commentRequest.of(user, post);
    post.addComment(comment);
    return commentRepository.save(comment).getId();
  }

  @Transactional
  public void updateComment(CommentRequest commentRequest, User user) {

  }

  @Transactional
  public void deleteComment(User user, Long postId, Long commentId) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(
            () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. commentId=" + commentId));
    comment.getPost().decreaseCommentCount();
    commentRepository.delete(comment);
  }

  public Page<CommentListResponse> readByPage(Pageable pageable, Long postId) {
    List<Comment> list = postRepository.findById(postId).get().getComments();
    log.info(list.toString());
    int totalElements = list.size();
    Page<CommentListResponse> page =
        new PageImpl<>(list
            .stream().map(
                comment -> CommentListResponse.builder().createDate(comment.getCreatedDate())
                    .content(comment.getContent()).author(comment.getUser().getName())
                    .id(comment.getId()).build()).collect(Collectors.toList()), pageable,
            totalElements);
    return page;
  }
}
