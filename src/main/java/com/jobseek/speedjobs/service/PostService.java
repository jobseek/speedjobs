package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.*;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.PostTagRepository;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostRepository postRepository;
	private final TagRepository tagRepository;
	private final PostTagRepository postTagRepository;

	@Transactional
	public Long save(PostRequest request, User user) {
		Post post = request.toEntity();
		post.setUser(user);
		addTags(request.getTagIds(), post);
		return postRepository.save(post).getId();
	}

	@Transactional
	public void update(Long id, User user, PostRequest request) {
		Post post = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		if (post.getUser().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		post.getPostTags().forEach(postTagRepository::delete);
		post.getPostTags().clear();
		addTags(request.getTagIds(), post);
		post.update(request.getTitle(), request.getContent());
	}

	@Transactional
	public void delete(Long id, User user) {
		Post post = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다.  id=" + id));
		if (user.getRole() != ROLE_ADMIN && post.getUser().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		postRepository.delete(post);
	}

	@Transactional
	public PostResponse readById(Long id) {
		Post post = postRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
		post.increaseViewCount();
		return new PostResponse(post);
	}

	public Page<Post> readByPage(Pageable pageable) {
		return postRepository.findAll(pageable);
	}

	@Transactional
	public void addTags(Set<Long> tagIds, Post post) {
		tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다. id=" + tagId)))
			.forEach(tag -> postTagRepository.save(PostTag.createPostTag(post, tag)));
	}
}
