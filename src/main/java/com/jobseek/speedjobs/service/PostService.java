package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostResponseDto;
import com.jobseek.speedjobs.dto.post.PostSaveDto;
import com.jobseek.speedjobs.dto.post.PostUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostRepository postRepository;
	private final TagRepository tagRepository;
	private final UserService userService;

	@Transactional
	public Long save(PostSaveDto postSaveDto, Long userId) {
		User user = userService.findById(userId);
		Post post = postSaveDto.toEntity(user);
		List<PostTag> postTags = postSaveDto.getTagIds().stream()
			.map(tagId -> PostTag.builder()
				.post(post)
				.tag(tagRepository.findById(tagId)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
				.build())
			.collect(Collectors.toList());
		post.setPostTags(postTags);
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
