package com.jobseek.speedjobs.service;

import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitDetail;
import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RecruitServiceTest {

	@Mock
	RecruitRepository recruitRepository;

	@Mock
	RecruitQueryRepository recruitQueryRepository;

	@Mock
	TagService tagService;

	@Mock
	UserService userService;

	RecruitService recruitService;

	@BeforeEach
	void setUp() {
		recruitService = new RecruitService(recruitRepository, recruitQueryRepository, tagService,
			userService);
	}

	@DisplayName("서비스 생성 테스트")
	@Test
	void createService() {
		assertNotNull(recruitService);
	}

	@DisplayName("공고 저장 테스트")
	@Test
	void saveTest() {
		// given
		RecruitDetail recruitDetail = RecruitDetail.builder()
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.build();
		Recruit expected = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021,6,20,0,0,0))
			.status(Status.PROCESS)
			.experience(1)
			.viewCount(200)
			.favoriteCount(100)
			.recruitDetail(recruitDetail)
			.build();
		List<Tag> tags = new ArrayList<>();
		Tag tag = Tag.builder()
			.id(1L)
			.type(Type.SKILL)
			.name("재미있는 스프링부트")
			.build();
		tags.add(tag);
		expected.addTags(tags);
		System.out.println(expected);
		System.out.println(expected.getTags().size());

		RecruitRequest recruitRequest = RecruitRequest
			.builder()
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021,6,20,0,0,0))
			.status(Status.PROCESS)
			.experience(1)
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.tagIds(Arrays.asList(1L,2L,3L))
			.build();

		User company = User.builder()
			.password("jobseek2021!")
			.contact("010-1234-5678")
			.nickname("잡식회사")
			.role(Role.ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.build();

		given(recruitRepository.save(any(Recruit.class))).willReturn(expected);
		Recruit save = recruitRepository.save(expected);
		Long savedRecruit = recruitService.save(recruitRequest, company);
		assertEquals(expected.getId(),save.getId());
		assertEquals(expected.getId(),savedRecruit);
	}
}
