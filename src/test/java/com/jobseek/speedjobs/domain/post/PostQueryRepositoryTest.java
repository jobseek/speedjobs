//package com.jobseek.speedjobs.domain.post;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import com.jobseek.speedjobs.dto.post.PostSearchCondition;
//import java.util.List;
//import java.util.stream.Collectors;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort.Direction;
//import org.springframework.transaction.annotation.Transactional;
//
//@SpringBootTest
//@Transactional
//@TestMethodOrder(OrderAnnotation.class)
//class PostQueryRepositoryTest {
//
//	@Autowired
//	PostQueryRepository postQueryRepository;
//	@Autowired
//	PostRepository postRepository;
//
//	/**
//	 * 페이징 검증 테스트
//	 */
//	@Test
//	@DisplayName("페이징 테스트")
//	@Order(1)
//	public void testPaging() {
//		//given
//		PostSearchCondition condition = new PostSearchCondition();
//		PageRequest pageRequest = PageRequest.of(0, 10);
//
//		//when
//		Page<Post> result = postQueryRepository.findAll(condition, pageRequest);
//
//		//then
//		assertEquals(" Python", result.getContent().get(0).getTitle());
//		assertEquals("자바 정규식", result.getContent().get(7).getTitle());
//	}
//
//	/**
//	 * id 순으로 정렬 검증 테스트
//	 */
//	@Test
//	@DisplayName("정렬 테스트")
//	@Order(2)
//	public void testSort() {
//		//given
//		PostSearchCondition condition = new PostSearchCondition();
//		PageRequest pageRequest = PageRequest.of(0, 5, Direction.DESC, "id");
//
//		//when
//		Page<Post> result = postQueryRepository.findAll(condition, pageRequest);
//
//		//then
//		assertEquals(4, result.getContent().get(4).getId());
//		assertEquals(8, result.getContent().get(0).getId());
//	}
//
//	/**
//	 * viewCount 순으로 정렬 검증 테스트
//	 */
//	@Test
//	@DisplayName("페이징+정렬 테스트")
//	@Order(3)
//	public void testPagingAndSort() {
//		//given
//		PostSearchCondition condition = new PostSearchCondition();
//		PageRequest pageRequest = PageRequest.of(1, 4, Direction.DESC, "viewCount");
//
//		//when
//		Page<Post> result = postQueryRepository.findAll(condition, pageRequest);
//		List<Post> content = result.getContent();
//		List<Integer> viewCountByResult = content.stream().map(Post::getViewCount)
//			.collect(Collectors.toList());
//
//		//then
//		assertThat(viewCountByResult.get(2)).isGreaterThan(viewCountByResult.get(3));
//	}
//
//	/**
//	 * 제목에 '차이'가 들어간 목록 검색 검증 테스트
//	 */
//	@Test
//	@DisplayName("조건 검색 테스트(title)")
//	@Order(4)
//	public void testFindAllWithCondition() {
//		//given
//		PostSearchCondition condition = PostSearchCondition.builder().title("차이").build();
//		PageRequest pageRequest = PageRequest.of(0, 10);
//
//		//when
//		Page<Post> result = postQueryRepository.findAll(condition, pageRequest);
//
//		//then
//		assertThat(result.getContent().size()).isEqualTo(2);
//	}
//
//}
