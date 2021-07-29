package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.CommentRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.dto.post.CommentRequest;
import com.jobseek.speedjobs.dto.post.CommentResponse;
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
class CommentServiceTest {

	private Comment comment;
	private Post post;
	private Member author;

	private CommentService commentService;

	@Mock
	private CommentRepository commentRepository;

	@Mock
	private PostService postService;

	@BeforeEach
	void setUp() {
		commentService = new CommentService(commentRepository, postService);

		author = Member.builder()
			.id(1L)
			.role(Role.ROLE_MEMBER)
			.build();
		post = Post.builder()
			.id(1L)
			.title("카프카 스터디 하실 분")
			.postDetail(PostDetail.from("쪽지 남겨주세요."))
			.user(author)
			.build();
		comment = Comment.builder()
			.id(1L)
			.content("모집 종료")
			.post(post)
			.user(author)
			.build();
	}

	@DisplayName("댓글 등록")
	@Test
	void save() {
		CommentRequest request = CommentRequest.builder()
			.content(comment.getContent())
			.build();
		given(postService.getPost(any())).willReturn(post);

		commentService.save(request, author, 1L);

		assertEquals(1, post.getCommentCount());
		assertEquals(1, post.getComments().size());
	}

	@DisplayName("댓글 수정")
	@Test
	void update() {
		CommentRequest request = CommentRequest.builder()
			.content("1명 더 모집합니다.")
			.build();
		given(commentRepository.findById(any())).willReturn(Optional.of(comment));

		commentService.update(request, author, 1L);

		assertEquals(request.getContent(), comment.getContent());
	}

	@DisplayName("댓글 삭제")
	@Test
	void delete() {
		post.increaseCommentCount();
		post.getComments().add(comment);
		given(commentRepository.findById(any())).willReturn(Optional.of(comment));

		commentService.delete(author, 1L);

		assertEquals(0, post.getCommentCount());
		assertEquals(0, post.getComments().size());
	}

	@DisplayName("한 게시글의 전체 댓글 조회")
	@Test
	void findAllByPost() {
		given(commentRepository.findAllByPostId(any(), any()))
			.willReturn(new PageImpl<>(List.of(comment)));

		Page<CommentResponse> responses = commentService
			.findAllByPost(1L, author, Pageable.unpaged());

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("댓글 좋아요")
	@Test
	void saveCommentFavorite() {
		given(commentRepository.findById(any())).willReturn(Optional.of(comment));

		commentService.saveCommentFavorite(1L, author);

		assertEquals(1, comment.getFavoriteCount());
	}

	@DisplayName("댓글 좋아요 취소")
	@Test
	void deleteCommentFavorite() {
		comment.getFavorites().add(author);
		given(commentRepository.findById(any())).willReturn(Optional.of(comment));

		commentService.deleteCommentFavorite(1L, author);

		assertEquals(0, comment.getFavoriteCount());
	}
}
