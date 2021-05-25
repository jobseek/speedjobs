//package com.jobseek.speedjobs.service;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//import com.jobseek.speedjobs.domain.member.Member;
//import com.jobseek.speedjobs.domain.post.Post;
//import com.jobseek.speedjobs.domain.post.PostDetail;
//import com.jobseek.speedjobs.domain.post.PostQueryRepository;
//import com.jobseek.speedjobs.domain.post.PostRepository;
//import com.jobseek.speedjobs.domain.tag.Tag;
//import com.jobseek.speedjobs.domain.tag.Type;
//import com.jobseek.speedjobs.dto.post.PostRequest;
//import java.util.Arrays;
//import java.util.List;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//@ExtendWith(MockitoExtension.class)
//class PostServiceTest {
//
//	private PostService postService;
//
//	@Mock
//	private PostQueryRepository postQueryRepository;
//
//	@Mock
//	private PostRepository postRepository;
//
//	@Mock
//	private TagService tagService;
//
//	private Post post;
//
//	private Member member;
//
//	@BeforeEach
//	void setUp() {
//		postService = new PostService(postQueryRepository, postRepository, tagService);
//
//		// post
//		post = Post.builder()
//			.id(1L)
//			.title("redis 관련 질문이 있습니다.")
//			.postDetail(PostDetail.from("redis가 뭔가요?"))
//			.build();
//		Tag tag1 = Tag.builder()
//			.id(1L)
//			.type(Type.SKILL)
//			.name("DB")
//			.build();
//		Tag tag2 = Tag.builder()
//			.type(Type.SKILL)
//			.name("Redis")
//			.build();
//		List<Tag> tags = Arrays.asList(tag1, tag2);
//		post.addTags(tags);
//
//		// member
//		member = Member.builder()
//			.id(1L)
//			.
//	}
//
//	@DisplayName("서비스 생성 테스트")
//	@Test
//	void createService() {
//		assertNotNull(postService);
//	}
//
//	@DisplayName("게시글 저장 테스트")
//	@Test
//	void saveTest() {
//		// given
//		PostRequest postRequest = PostRequest.builder()
//			.title("redis 관련 질문이 있습니다.")
//			.content("redis가 뭔가요?")
//			.tagIds(Arrays.asList(1L, 2L))
//			.build();
//
//
//	}
//
//}
