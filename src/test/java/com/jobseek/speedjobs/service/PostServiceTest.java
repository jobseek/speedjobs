package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import org.junit.jupiter.api.BeforeEach;
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
	private TagRepository tagRepository;

	@BeforeEach
	void setUp() {
//		postService = new PostService()
	}


}
