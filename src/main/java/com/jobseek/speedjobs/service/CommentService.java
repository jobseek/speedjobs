package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.CommentRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
	private final PostRepository postRepository;

	@Transactional
	public Long saveComment(CommentRequest commentRequest, User user, Long postId) {
		Post post = findPost(postId);
		Comment comment = commentRequest.of(user, post);
		comment.addComment(post);
		return commentRepository.save(comment).getId();
	}

	@Transactional
	public void updateComment(CommentRequest commentRequest, User user, Long commentId) {
		Comment comment = findOne(commentId);
		validateUser(comment, user);
		comment.updateComment(commentRequest.toEntity());
	}

	@Transactional
	public void deleteComment(User user, Long commentId) {
		Comment comment = findOne(commentId);
		validateUser(comment, user);
		commentRepository.delete(comment);
	}

	public Page<CommentResponse> findByPage(Long postId, Pageable pageable) {
		List<Comment> comments = findPost(postId).getComments();
		return new PageImpl<>(comments.stream()
			.map(CommentResponse::of)
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

	private Post findPost(Long postId) {
		return postRepository.findById(postId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. postId=" + postId));
	}

	private Comment findOne(Long commentId) {
		return commentRepository.findById(commentId)
			.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));
	}

	private void validateUser(Comment comment, User user) {
		if (!user.isAdmin() && user != comment.getUser()) {
			throw new UnauthorizedException("댓글을 지울 수 있는 권한이 없습니다.");
		}
	}

}
