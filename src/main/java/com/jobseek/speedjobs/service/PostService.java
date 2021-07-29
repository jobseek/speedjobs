package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostQueryRepository postQueryRepository;
	private final PostRepository postRepository;
	private final TagService tagService;

	@Transactional
	public Long save(PostRequest request, User user) {
		Post post = request.toEntity(user);
		List<Tag> tags = tagService.getTagsByIds(request.getTagIds());
		post.addTags(tags);
		return postRepository.save(post).getId();
	}

	@Transactional
	public void update(Long postId, User user, PostRequest request) {
		Post post = getPost(postId);
		post.getUser().verifyMe(user.getId());
		List<Tag> tags = tagService.getTagsByIds(request.getTagIds());
		post.update(request.toEntity(user), tags);
	}

	@Transactional
	public void delete(Long postId, User user) {
		Post post = getPost(postId);
		if (!user.isAdmin()) {
			post.getUser().verifyMe(user.getId());
		}
		postRepository.delete(post);
	}

	@Transactional
	public PostResponse findOne(Long postId, User user) {
		Post post = getPost(postId);
		if (user != post.getUser()) {
			post.increaseViewCount();
		}
		return PostResponse.of(post, user);
	}

	@Transactional
	public void savePostFavorite(Long postId, User user) {
		Post post = getPost(postId);
		post.addFavorite(user);
	}

	@Transactional
	public void deletePostFavorite(Long postId, User user) {
		Post post = getPost(postId);
		post.removeFavorite(user);
	}

	public Page<PostListResponse> findPostFavorites(Pageable pageable, User user) {
		return postRepository.findAllByFavoritesContains(user, pageable)
			.map(post -> PostListResponse.of(post, user));
	}

	public Page<PostListResponse> findAll(PostSearchCondition condition, Pageable pageable,
		User user) {
		return postQueryRepository.findAll(condition, pageable)
			.map(post -> PostListResponse.of(post, user));
	}

	public Post getPost(Long postId) {
		return postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 게시글입니다."));
	}
}
