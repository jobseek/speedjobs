package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import com.querydsl.core.QueryFactory;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostQueryRepository postQueryRepository;
	private final PostRepository postRepository;
	private final TagRepository tagRepository;

	@Transactional
	public Long save(PostRequest postRequest, User user) {
		Post post = postRequest.toEntity();
		post.setUser(user);
		List<Tag> tags = findTagsById(postRequest.getTagIds());
		post.addTags(tags);
		return postRepository.save(post).getId();
	}

	@Transactional
	public void update(Long postId, User user, PostRequest postRequest) {
		Post post = findOne(postId);
		if (post.getUser() != user) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		List<Tag> tags = findTagsById(postRequest.getTagIds());
		post.update(postRequest.toEntity(), tags);
	}

	@Transactional
	public void delete(Long postId, User user) {
		Post post = findOne(postId);
		if (!user.isAdmin() && post.getUser() != user) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		postRepository.delete(post);
	}

	@Transactional
	public PostResponse findById(Long postId, User user) {
		Post post = findOne(postId);
		post.increaseViewCount();
		return PostResponse.of(post, user);
	}

	public Page<PostListResponse> findByPage(final Pageable pageable, User user) {
		Page<Post> page = postRepository.findAll(pageable);
		return new PageImpl<>(page.stream()
			.map(post -> PostListResponse.of(post, user))
			.collect(Collectors.toList()), pageable, page.getTotalElements());
	}

	private List<Tag> findTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}

	/**
	 * 찜하기
	 */
	@Transactional
	public void savePostFavorite(Long postId, User user) {
		Post post = findOne(postId);
		post.addFavorite(user);
	}

	@Transactional
	public void deletePostFavorite(Long postId, User user) {
		Post post = findOne(postId);
		post.removeFavorite(user);
	}

	public Page<PostListResponse> findPostFavorites(final Pageable pageable, User user) {
		List<Post> posts = user.getPostFavorites();
		final int start = (int) pageable.getOffset();
		final int end = Math.min((start + pageable.getPageSize()), posts.size());
		return new PageImpl<>(posts.subList(start, end).stream()
			.map(post -> PostListResponse.of(post, user))
			.collect(Collectors.toList()), pageable, posts.size());
	}

	private Post findOne(Long postId) {
		return postRepository.findById(postId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
	}

	public Page<PostListResponse> findAll(PostSearchCondition condition, Pageable pageable, User user) {
		return postQueryRepository.findAll(condition, pageable)
			.map(post -> new PostListResponse(post, user));
	}
}
