package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.CommentRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
	public void save(CommentRequest request, User user, Long postId) {
		Post post = postService.getPost(postId);
		Comment comment = request.toEntity(user, post);
		post.increaseCommentCount();
		post.getComments().add(comment);
	}

	@Transactional
	public void update(CommentRequest request, User user, Long commentId) {
		Comment comment = getComment(commentId);
		comment.getUser().verifyMe(user.getId());
		comment.update(request.getContent());
	}

	@Transactional
	public void delete(User user, Long commentId) {
		Comment comment = getComment(commentId);
		if (!user.isAdmin()) {
			comment.getUser().verifyMe(user.getId());
		}
		Post post = comment.getPost();
		post.decreaseCommentCount();
		post.getComments().remove(comment);
	}

	public Page<CommentResponse> findAllByPost(Long postId, User user, Pageable pageable) {
		return commentRepository.findAllByPostId(postId, pageable)
			.map(comment -> CommentResponse.of(comment, user));
	}

	@Transactional
	public void saveCommentFavorite(Long commentId, User user) {
		Comment comment = getComment(commentId);
		comment.addFavorite(user);
	}

	@Transactional
	public void deleteCommentFavorite(Long commentId, User user) {
		Comment comment = getComment(commentId);
		comment.removeFavorite(user);
	}

	private Comment getComment(Long commentId) {
		return commentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException("해당 댓글이 존재하지 않습니다."));
	}
}
