package com.jobseek.speedjobs.domain.recruit;

import static org.assertj.core.api.Assertions.*;

import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import com.jobseek.speedjobs.utils.QueryDslUtil;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestMethodOrder(OrderAnnotation.class)
class RecruitQueryRepositoryTest {

	@Autowired
	RecruitQueryRepository recruitQueryRepository;
	@Autowired
	RecruitRepository recruitRepository;

	/**
	* 페이징 검증 테스트
	 */
	@Test
	@DisplayName("페이징 테스트")
	@Order(1)
	public void testPaging() {
		//given
		RecruitSearchCondition condition = new RecruitSearchCondition();
		PageRequest pageRequest = PageRequest.of(0, 10);

		//when
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);

		//then
		assertThat(result.getContent().get(0).getRecruitDetail().getContent()).contains("매스프레소");
		assertThat(result.getContent().get(9).getRecruitDetail().getContent()).contains("리디의 모바일");
	}

	/**
	* id 순으로 정렬 검증 테스트
	*/
	@Test
	@DisplayName("정렬 테스트")
	@Order(2)
	public void testSort() {
		//given
		RecruitSearchCondition condition = new RecruitSearchCondition();
		PageRequest pageRequest = PageRequest.of(0, 10, Direction.DESC, "id");

		//when
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);

		//then
		assertThat(result.getContent().get(0).getId()).isEqualTo(14);
	}

	/**
	* viewCount 순으로 정렬 검증 테스트
	*/
	@Test
	@DisplayName("페이징+정렬 테스트")
	@Order(3)
	public void testPagingAndSort() {
		//given
		RecruitSearchCondition condition = new RecruitSearchCondition();
		PageRequest pageRequest = PageRequest.of(1, 4, Direction.DESC, "viewCount");

		//when
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);
		List<Recruit> content = result.getContent();
		List<Integer> viewCountByResult = content.stream().map(Recruit::getViewCount)
			.collect(Collectors.toList());

		//then
		assertThat(viewCountByResult.get(0)).isGreaterThan(viewCountByResult.get(1));
	}

	/**
	* 제목에 '엔지니어'가 들어간 목록 검색 검증 테스트
	*/
	@Test
	@DisplayName("조건 검색 테스트(title)")
	@Order(4)
	public void testFindAllWithCondition() {
		//given
		RecruitSearchCondition condition = RecruitSearchCondition.builder().title("엔지니어").build();
		PageRequest pageRequest = PageRequest.of(0, 10);

		//when
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);

		//then
		assertThat(result.getContent().size()).isEqualTo(4);
	}

	/**
	* 공고 시작일 부터 끝나는 날짜 사이의 공고들만 검색되는지 검증 테스트
	*/
	@Test
	@DisplayName("조건 검색 테스트2(Between Date)")
	@Order(5)
	public void testFindAllWithCondition2() {
		//given
		RecruitSearchCondition condition = RecruitSearchCondition.builder()
			.openDate(LocalDate.of(2021,4,1))
			.closeDate(LocalDate.of(2021,4,30))
			.build();

		//when
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);

		//then
		assertThat(result.getContent().size()).isEqualTo(5);
	}
}
