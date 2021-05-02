package com.jobseek.speedjobs.domain.recruit;

import static org.assertj.core.api.Assertions.*;

import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class RecruitQueryRepositoryTest {

	@Autowired
	RecruitQueryRepository recruitQueryRepository;
	@Autowired
	RecruitRepository recruitRepository;

	@Test
	@DisplayName("페이징 테스트")
	public void testFindAll() {
		RecruitSearchCondition condition = new RecruitSearchCondition();
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);
		assertThat(result.getContent().get(0).getRecruitDetail().getContent()).contains("매스프레소");
		assertThat(result.getContent().get(9).getRecruitDetail().getContent()).contains("리디의 모바일");
	}

	@Test
	@DisplayName("조건 검색 테스트")
	public void testFindAllWithCondition() {
		RecruitSearchCondition condition = RecruitSearchCondition.builder().title("엔지니어").build();
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);
		assertThat(result.getContent().size()).isEqualTo(4);
	}

	@Test
	@DisplayName("조건 검색 테스트2")
	public void testFindAllWithCondition2() {
		RecruitSearchCondition condition = RecruitSearchCondition.builder()
			.openDate(LocalDate.of(2021,4,1))
			.closeDate(LocalDate.of(2021,4,30))
			.build();
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<Recruit> result = recruitQueryRepository.findAll(condition, pageRequest);
		assertThat(result.getContent().size()).isEqualTo(5);
	}
}
