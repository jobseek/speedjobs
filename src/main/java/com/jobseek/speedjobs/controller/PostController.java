package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostSaveDto;
import com.jobseek.speedjobs.dto.post.PostUpdateDto;
import com.jobseek.speedjobs.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = {"3. Post"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {

	private final PostService postService;

	@ApiOperation(value = "게시글 둥록", notes = "게시글을 등록한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping("/new")
	public ResponseEntity<Void> createPost(@LoginUser User user,
		@RequestBody PostSaveDto postSaveDto) {
		log.info("user info - {}", user);
		log.info("postSaveDto - {}", postSaveDto);
		postService.save(postSaveDto);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@DeleteMapping("/{postId}")
	public ResponseEntity<Void> deletePost(@LoginUser User user,
		@PathVariable("postId") Long postId) {
		postService.delete(postId);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 업데이트", notes = "게시글을 업데이트한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PutMapping("/{postId}")
	public ResponseEntity<Void> updatePost(@LoginUser User user,
		@PathVariable("postId") Long postId, @RequestBody PostUpdateDto postUpdateDto) {
		postService.update(postId, postUpdateDto);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "게시글 가져오기", notes = "페이징된 게시글 리스트를 가져온다.")
	@GetMapping("/paging")
	public Page<Post> findPostsByPage(final Pageable pageable) {
		return postService.findAllByPage(pageable);
	}
}
