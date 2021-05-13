package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.CommentRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CommentService {

	private final CommentRepository commentRepository;
	private final PostService postService;

	@Transactional
	public Long saveComment(CommentRequest commentRequest, User user, Long postId) {
		Post post = postService.findOne(postId);
		post.increaseCommentCount();
		Comment comment = commentRequest.of(user, post);
		return commentRepository.save(comment).getId();
	}

	@Transactional
	public void updateComment(CommentRequest commentRequest, User user, Long commentId) {
		Comment comment = findOne(commentId);
		comment.getUser().validateMe(user.getId());
		comment.updateComment(commentRequest.toEntity());
	}

	@Transactional
	public void deleteComment(User user, Long commentId) {
		Comment comment = findOne(commentId);
		if (!user.isAdmin()) {
			comment.getUser().validateMe(user.getId());
		}
		comment.getPost().decreaseCommentCount();
		commentRepository.delete(comment);
	}

	public Page<CommentResponse> findByPage(Long postId, User user, Pageable pageable) {
		List<Comment> comments = postService.findOne(postId).getComments();
		return new PageImpl<>(comments.stream()
			.map(comment -> CommentResponse.of(comment, user))
			.collect(Collectors.toList()), pageable, comments.size());
	}

	@Transactional
	public void saveCommentFavorite(Long commentId, User user) {
		Comment comment = findOne(commentId);
		comment.addFavorite(user);
	}

	@Transactional
	public void deleteCommentFavorite(Long commentId, User user) {
		Comment comment = findOne(commentId);
		comment.removeFavorite(user);
	}

	private Comment findOne(Long commentId) {
		return commentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException("해당 댓글이 존재하지 않습니다."));
	}
}
