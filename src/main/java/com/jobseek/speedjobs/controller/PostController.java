package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.service.CommentService;
import com.jobseek.speedjobs.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Api(tags = {"Post"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

	private final PostService postService;
	private final CommentService commentService;

	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@PostMapping
	public ResponseEntity<Void> savePost(@LoginUser User user,
		@Valid @RequestBody PostRequest postRequest) {
		Long postId = postService.save(postRequest, user);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId, @LoginUser User user) {
		postService.delete(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 수정", notes = "게시글을 수정한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@PutMapping("/{postId}")
	public ResponseEntity<Void> updatePost(@PathVariable Long postId, @LoginUser User user,
		@Valid @RequestBody PostRequest postRequest) {
		postService.update(postId, user, postRequest);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "게시글 단건 조회", notes = "게시글을 조회한다.")
	@GetMapping("/{postId}")
	public ResponseEntity<PostResponse> findPost(@PathVariable Long postId, @LoginUser User user) {
		return ResponseEntity.ok().body(postService.findById(postId, user));
	}

	@ApiOperation(value = "게시글 페이징 조회", notes = "게시글을 페이징 조회한다.")
	@GetMapping("/paging")
	public ResponseEntity<Page<PostListResponse>> findPostsByPage(Pageable pageable, @LoginUser User user) {
		return ResponseEntity.ok().body(postService.findByPage(pageable, user));
	}

	/**
	 * 찜하기
	 */
	@ApiOperation(value = "게시글 찜하기", notes = "게시글을 찜한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@PostMapping("/{postId}/favorite")
	public ResponseEntity<Void> savePostFavorite(@PathVariable Long postId, @LoginUser User user) {
		postService.savePostFavorite(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 찜하기 취소", notes = "게시글을 찜목록에서 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@DeleteMapping("/{postId}/favorite")
	public ResponseEntity<Void> deletePostFavorite(@PathVariable Long postId,
		@LoginUser User user) {
		postService.deletePostFavorite(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 찜 목록 조회하기", notes = "게시글 찜 목록을 조회한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@GetMapping("/favorites")
	public ResponseEntity<Page<PostListResponse>> findPostFavorites(@LoginUser User user,
		Pageable pageable) {
		return ResponseEntity.ok().body(postService.findPostFavorites(pageable, user));
	}

	/**
	 * 댓글 등록, 수정, 삭제, 조회
	 */
	@ApiOperation(value = "댓글 등록", notes = "댓글을 등록한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping("/{postId}")
	public ResponseEntity<Void> saveComment(@LoginUser User user,
		@Valid @RequestBody CommentRequest commentRequest,
		@PathVariable Long postId) {
		Long id = commentService.saveComment(commentRequest, user, postId);
		return ResponseEntity.created(URI.create("/api/post/" + id)).build();
	}

	@ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PutMapping("/{postId}/{commentId}")
	public ResponseEntity<Void> updateComment(@Valid @RequestBody CommentRequest commentRequest,
		@PathVariable Long postId, @PathVariable Long commentId, @LoginUser User user) {
		commentService.updateComment(commentRequest, user, commentId);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}/{commentId}")
	public ResponseEntity<Void> deleteComment(@LoginUser User user, @PathVariable Long postId,
		@PathVariable Long commentId) {
		commentService.deleteComment(user, commentId);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "댓글 조회", notes = "댓글을 조회한다.")
	@GetMapping("/{postId}/paging")
	public ResponseEntity<Page<CommentResponse>> findCommentsByPage(@PathVariable Long postId,
		Pageable pageable) {
		return ResponseEntity.ok().body(commentService.findByPage(postId, pageable));
	}

//	@ApiOperation(value = "댓글 좋아요", notes = "댓글을 좋아요 누른다.")
//	@PostMapping("/{postId}/{commentId}/up")
//	public ResponseEntity<Void> pushCommentLike(@PathVariable Long postId,
//		@PathVariable Long commentId) {
//		commentService.like(commentId);
//		return ResponseEntity.noContent().build();
//	}
//
//	@ApiOperation(value = "댓글 싫어요", notes = "댓글을 싫어요 누른다.")
//	@PostMapping("/{postId}/{commentId}/down")
//	public ResponseEntity<Void> pushCommentHate(@PathVariable Long postId,
//		@PathVariable Long commentId) {
//		commentService.hate(commentId);
//		return ResponseEntity.noContent().build();
//	}
}
