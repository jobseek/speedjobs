package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.PostTagRepository;
import com.jobseek.speedjobs.domain.tag.TagRepository;
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

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostRepository postRepository;
	private final TagRepository tagRepository;
	private final PostTagRepository postTagRepository;

	@Transactional
	public Long save(PostSaveDto postSaveDto, User user) {
		Post post = postSaveDto.toEntity();
		post.setUser(user);
		postSaveDto.getTagIds().stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.forEach(tag -> postTagRepository.save(PostTag.createPostTag(post, tag)));
		return postRepository.save(post).getId();
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
