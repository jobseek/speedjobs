package com.jobseek.speedjobs.service;

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
			.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. commentId=" + commentId));
		comment.getPost().decreaseCommentCount();
		commentRepository.delete(comment);
	}
}
