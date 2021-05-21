package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.dto.post.PostRequest;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

	private PostService postService;

	@Mock
	private PostQueryRepository postQueryRepository;

	@Mock
	private PostRepository postRepository;

	@Mock
	private TagService tagService;

	@BeforeEach
	void setUp() {
		postService = new PostService(postQueryRepository, postRepository, tagService);
	}

	@Test
	public void test() {
		PostRequest postRequest = PostRequest.builder()
			.title("밥갑습니다.")
			.content("반갑워요")
			.tagIds(Arrays.asList(1L, 2L))
			.build();
		Post post = postRequest.toEntity();
	}

}
