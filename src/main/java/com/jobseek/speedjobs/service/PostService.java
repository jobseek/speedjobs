package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.BoardTag;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostResponseDto;
import com.jobseek.speedjobs.dto.post.PostSaveDto;
import com.jobseek.speedjobs.dto.post.PostUpdateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostRepository postRepository;
	private final UserService userService;

	@Transactional
	public Long save(PostSaveDto postSaveDto, Long userId) {
		User user = userService.findById(userId);
		return postRepository.save(postSaveDto.toEntity(user)).getId();
	}

	@Transactional
	public Long update(Long id, PostUpdateDto postUpdateDto) {
		Post post = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		post.update(postUpdateDto.getTitle(), postUpdateDto.getContent());
		return id;
	}

	public Page<Post> readByPage(Pageable pageable) {
		return postRepository.findAll(pageable);
	}

	@Transactional
	public void delete(Long id) {
		Post posts = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다.  id=" + id));
		postRepository.delete(posts);
	}

	public PostResponseDto readById(Long id) {
		Post entity = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		return new PostResponseDto(entity);
	}
}
