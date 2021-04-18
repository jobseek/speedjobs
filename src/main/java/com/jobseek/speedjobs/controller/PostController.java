package com.jobseek.speedjobs.controller;

import java.net.URI;

import javax.validation.Valid;

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

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.service.CommentService;
import com.jobseek.speedjobs.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Api(tags = {"Post"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

	private final PostService postService;
	private final CommentService commentService;

	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping
	public ResponseEntity<Void> savePost(@LoginUser User user, @Valid @RequestBody PostRequest postRequest) {
		Long id = postService.save(postRequest, user);
		return ResponseEntity.created(URI.create("/api/post/" + id)).build();
	}

	@ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId, @LoginUser User user) {
		postService.delete(postId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 업데이트", notes = "게시글을 업데이트한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PutMapping("/{postId}")
	public ResponseEntity<Void> updatePost(@PathVariable Long postId, @LoginUser User user,
		@Valid @RequestBody PostRequest postRequest) {
		postService.update(postId, user, postRequest);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "게시글 단건 조회", notes = "게시글을 조회한다.")
	@GetMapping("/{postId}")
	public ResponseEntity<PostResponse> readPost(@PathVariable Long postId) {
		return ResponseEntity.ok().body(postService.readById(postId));
	}

	// TODO: 태그와 검색어 등으로 조회하도록 수정 예정
	@ApiOperation(value = "게시글 페이징 조회", notes = "게시글을 조회한다.")
	@GetMapping("/paging")
	public Page<Post> readPostsByPage(final Pageable pageable) {
		return postService.readByPage(pageable);
	}

	/**
	 * 댓글 등록, 수정, 삭제
	 */
	@ApiOperation(value = "댓글 등록", notes = "댓글을 등록한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PostMapping("/{postId}")
	public ResponseEntity<Void> saveComment(@LoginUser User user, @Valid @RequestBody CommentRequest commentRequest,
		@PathVariable Long postId) {
		Long id = commentService.saveComment(commentRequest, user, postId);
		return ResponseEntity.created(URI.create("/api/post/" + id)).build();
	}

	@ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@PutMapping("/{postId}/{commentId}")
	public ResponseEntity<Void> updateComment(@LoginUser User user, @Valid @RequestBody CommentRequest commentRequest,
		@PathVariable Long postId, @PathVariable Long commentId) {
		commentService.updateComment(commentRequest, user);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}

	@ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@DeleteMapping("/{postId}/{commentId}")
	public ResponseEntity<Void> deleteComment(@LoginUser User user, @PathVariable Long postId,
		@PathVariable Long commentId) {
		commentService.deleteComment(user, postId, commentId);
		return ResponseEntity.created(URI.create("/api/post/" + postId)).build();
	}
}
