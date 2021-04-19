package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_ADMIN;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.PostTagRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PostService {

	private final PostRepository postRepository;
	private final TagRepository tagRepository;
	private final PostTagRepository postTagRepository;

	@Transactional
	public Long save(PostRequest postRequest, User user) {
		Post post = postRequest.toEntity();
		post.setUser(user);
		List<Tag> tags = getTagsById(postRequest.getTagIds());
		createPostTags(post, tags);
		return postRepository.save(post).getId();
	}

	@Transactional
	public void update(Long postId, User user, PostRequest postRequest) {
		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. postId=" + postId));
		if (post.getUser().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		List<Tag> tags = getTagsById(postRequest.getTagIds());
		post.update(postRequest.toEntity(), tags);
	}

	@Transactional
	public void delete(Long postId, User user) {
		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다.  postId=" + postId));
		if (user.getRole() != ROLE_ADMIN && post.getUser().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		postRepository.delete(post);
	}

	@Transactional
	public PostResponse readById(Long postId) {
		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. postId=" + postId));
		post.increaseViewCount();
		return PostResponse.builder().build();
	}

	private void createPostTags(Post post, List<Tag> tags) {
		tags.forEach(tag -> PostTag.createPostTag(post, tag));
	}

	public Page<Post> readByPage(Pageable pageable) {
		return postRepository.findAll(pageable);
	}

	private List<Tag> getTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}
}
