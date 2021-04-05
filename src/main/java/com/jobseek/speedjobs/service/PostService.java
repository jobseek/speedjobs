package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.dto.post.PostResponseDto;
import com.jobseek.speedjobs.dto.post.PostSaveDto;
import com.jobseek.speedjobs.dto.post.PostUpdateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;

	@Transactional
	public Long save(PostSaveDto postSaveDto) {
		log.info("postSaveDto - {}", postSaveDto);
		return postRepository.save(postSaveDto.toEntity()).getId();
	}

	@Transactional
	public Long update(Long id, PostUpdateDto postUpdateDto) {
		Post post = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		post.update(postUpdateDto.getTitle(), postUpdateDto.getContent());
		return id;
	}

	@Transactional(readOnly = true)
	public Page<Post> findAllByPage(Pageable pageable) {
		return postRepository.findAll(pageable);
	}

	@Transactional
	public void delete(Long id) {
		Post posts = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다.  id=" + id));
		postRepository.delete(posts);
	}

	public PostResponseDto findById(Long id) {
		Post entity = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		return new PostResponseDto(entity);
	}
}
