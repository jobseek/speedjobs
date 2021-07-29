package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import com.jobseek.speedjobs.domain.post.PostQueryRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.dto.post.PostListResponse;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.post.PostResponse;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

	private Post post;
	private Member author;
	private Tag tag;

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

		author = Member.builder()
			.id(1L)
			.role(Role.ROLE_MEMBER)
			.build();
		post = Post.builder()
			.id(1L)
			.title("리액트 스터디 구합니다.")
			.postDetail(PostDetail.from("댓글 부탁드립니다"))
			.user(author)
			.build();
		tag = Tag.builder()
			.id(1L)
			.name("React")
			.type(Type.SKILL)
			.build();
	}

	@DisplayName("게시글 등록")
	@Test
	void save() {
		PostRequest request = PostRequest.builder()
			.title(post.getTitle())
			.content(post.getPostDetail().getContent())
			.tagIds(List.of(1L))
			.build();
		given(tagService.getTagsByIds(any())).willReturn(List.of(tag));
		given(postRepository.save(any(Post.class))).willReturn(post);

		Long id = postService.save(request, author);

		assertEquals(1L, id);
	}

	@DisplayName("게시글 수정")
	@Test
	void update() {
		PostRequest request = PostRequest.builder()
			.title("뷰 스터디 구합니다.")
			.content("댓글 남겨주세요.")
			.build();
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		postService.update(1L, author, request);

		assertAll(
			() -> assertEquals(1L, post.getId()),
			() -> assertEquals(request.getTitle(), post.getTitle()),
			() -> assertEquals(request.getContent(), post.getPostDetail().getContent())
		);
	}

	@DisplayName("게시글 삭제")
	@Test
	void delete() {
		given(postRepository.findById(any())).willReturn(Optional.of(post));
		doNothing().when(postRepository).delete(post);

		postService.delete(1L, author);

		verify(postRepository, times(1)).delete(post);
	}

	@DisplayName("게시글 단일 조회 - 본인")
	@Test
	void findById_Author() {
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		PostResponse response = postService.findOne(1L, author);

		assertEquals(1L, response.getId());
		assertEquals(0L, response.getViewCount());
	}

	@DisplayName("게시글 단일 조회 - 타인")
	@Test
	void findById_Other() {
		Member other = Member.builder()
			.id(2L)
			.role(Role.ROLE_MEMBER)
			.build();
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		PostResponse response = postService.findOne(1L, other);

		assertEquals(1L, response.getId());
		assertEquals(1L, response.getViewCount());
	}

	@DisplayName("게시글 찜하기")
	@Test
	void savePostFavorite() {
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		postService.savePostFavorite(1L, author);

		assertEquals(1, post.getFavoriteCount());
		assertTrue(post.favoriteOf(author));
	}

	@DisplayName("게시글 찜하기 취소")
	@Test
	void deletePostFavorite() {
		post.addFavorite(author);
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		postService.deletePostFavorite(1L, author);

		assertEquals(0, post.getFavoriteCount());
		assertFalse(post.favoriteOf(author));
	}

	@DisplayName("게시글 찜 목록 조회")
	@Test
	void findPostFavorites() {
		post.addFavorite(author);
		given(postRepository.findAllByFavoritesContains(any(), any()))
			.willReturn(new PageImpl<>(List.of(post)));

		Page<PostListResponse> responses = postService
			.findPostFavorites(Pageable.unpaged(), author);

		assertEquals(1L, responses.getTotalElements());
	}

	@DisplayName("게시글 전체 조회")
	@Test
	void findAll() {
		given(postQueryRepository.findAll(any(), any())).willReturn(new PageImpl<>(List.of(post)));

		Page<PostListResponse> responses = postService.findAll(null, null, author);

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("게시글 조회")
	@Test
	void findOne() {
		given(postRepository.findById(any())).willReturn(Optional.of(post));

		Post found = postService.getPost(1L);

		assertEquals(1L, found.getId());
	}
}
