package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import com.jobseek.speedjobs.service.CommentService;
import com.jobseek.speedjobs.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Post"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

	private static final String POST_URL_PREFIX = "/api/post/";

	private final PostService postService;
	private final CommentService commentService;

	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping
	public ResponseEntity<Void> savePost(@LoginUser User user,
		@Valid @RequestBody PostRequest request) {
		Long postId = postService.save(request, user);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "게시글 수정", notes = "게시글을 수정한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PutMapping("/{postId}")
	public ResponseEntity<Void> updatePost(@PathVariable Long postId, @LoginUser User user,
		@Valid @RequestBody PostRequest request) {
		postService.update(postId, user, request);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId, @LoginUser User user) {
		postService.delete(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 단건 조회", notes = "게시글을 조회한다.")
	@GetMapping("/{postId}")
	public ResponseEntity<PostResponse> findPost(@PathVariable Long postId, @LoginUser User user) {
		return ResponseEntity.ok().body(postService.findOne(postId, user));
	}

	@ApiOperation(value = "게시글 전체 조회", notes = "게시글을 전체 조회한다.")
	@GetMapping
	public ResponseEntity<Page<PostListResponse>> findAll(Pageable pageable, @LoginUser User user,
		PostSearchCondition condition) {
		return ResponseEntity.ok().body(postService.findAll(condition, pageable, user));
	}

	@ApiOperation(value = "게시글 찜하기", notes = "게시글을 찜한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping("/{postId}/favorite")
	public ResponseEntity<Void> savePostFavorite(@PathVariable Long postId, @LoginUser User user) {
		postService.savePostFavorite(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 찜하기 취소", notes = "게시글을 찜목록에서 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}/favorite")
	public ResponseEntity<Void> deletePostFavorite(@PathVariable Long postId,
		@LoginUser User user) {
		postService.deletePostFavorite(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 찜 목록 조회하기", notes = "게시글 찜 목록을 조회한다.")
	@GetMapping("/favorites")
	public ResponseEntity<Page<PostListResponse>> findPostFavorites(@LoginUser User user,
		final Pageable pageable) {
		return ResponseEntity.ok().body(postService.findPostFavorites(pageable, user));
	}

	@ApiOperation(value = "댓글 등록", notes = "댓글을 등록한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping("/{postId}/comment")
	public ResponseEntity<Void> saveComment(@LoginUser User user,
		@Valid @RequestBody CommentRequest request,
		@PathVariable Long postId) {
		commentService.save(request, user, postId);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PutMapping("/{postId}/comment/{commentId}")
	public ResponseEntity<Void> updateComment(@Valid @RequestBody CommentRequest request,
		@PathVariable Long postId, @PathVariable Long commentId, @LoginUser User user) {
		commentService.update(request, user, commentId);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}/comment/{commentId}")
	public ResponseEntity<Void> deleteComment(@LoginUser User user, @PathVariable Long postId,
		@PathVariable Long commentId) {
		commentService.delete(user, commentId);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "댓글 조회", notes = "댓글을 조회한다.")
	@GetMapping("/{postId}/comments")
	public ResponseEntity<Page<CommentResponse>> findCommentsByPage(@PathVariable Long postId,
		Pageable pageable, @LoginUser User user) {
		return ResponseEntity.ok().body(commentService.findAllByPost(postId, user, pageable));
	}

	@ApiOperation(value = "댓글 좋아요", notes = "댓글 추천")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping("/{postId}/comment/{commentId}/favorite")
	public ResponseEntity<Void> saveCommentFavorite(@PathVariable Long postId,
		@PathVariable Long commentId, @LoginUser User user) {
		commentService.saveCommentFavorite(commentId, user);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}

	@ApiOperation(value = "댓글 싫어요", notes = "댓글 추천 취소")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}/comment/{commentId}/favorite")
	public ResponseEntity<Void> deleteCommentFavorite(@PathVariable Long postId,
		@PathVariable Long commentId, @LoginUser User user) {
		commentService.deleteCommentFavorite(commentId, user);
		return ResponseEntity.created(URI.create(POST_URL_PREFIX + postId)).build();
	}
}
