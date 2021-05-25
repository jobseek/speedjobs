package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.anyLong;
import static org.mockito.BDDMockito.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.verify;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
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
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.status(Status.PROCESS)
			.experience(1)
			.viewCount(200)
			.favoriteCount(100)
			.recruitDetail(recruitDetail)
			.build();
		Tag tag = Tag.builder()
			.id(1L)
			.type(Type.SKILL)
			.name("재미있는 스프링부트")
			.build();
		List<Tag> tags = Collections.singletonList(tag);
		expected.addTags(tags);

		RecruitRequest recruitRequest = RecruitRequest.builder()
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.experience(1)
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.tagIds(Arrays.asList(1L, 2L, 3L))
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

		// when
		Long savedRecruit = recruitService.save(recruitRequest, company);

		// then
		assertEquals(expected.getId(), savedRecruit);
	}

	@DisplayName("공고 수정 테스트")
	@Test
	void updateTest() {
		// given
		Long id = 1L;
		Company company = Company.builder()
			.id(id)
			.password("jobseek2021!")
			.contact("010-1234-5678")
			.nickname("잡식회사")
			.role(Role.ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.build();
		RecruitRequest recruitRequest = RecruitRequest
			.builder()
			.title("프론트엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.experience(1)
			.position(Position.PERMANENT)
			.content("저희 회사 프론트엔드 모집해요.")
			.tagIds(Arrays.asList(3L, 5L, 8L))
			.build();
		given(recruitRepository.findById(anyLong()))
			.willReturn(Optional.of(recruitRequest.toEntity(company)));
		recruitService.update(id, company, recruitRequest);
	}

	@DisplayName("공고 삭제 테스트")
	@Test
	void deleteTest() {
		// given
		RecruitDetail recruitDetail = RecruitDetail.builder()
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.build();
		Company company = Company.builder()
			.id(1L)
			.password("jobseek2021!")
			.contact("010-1234-5678")
			.nickname("잡식회사")
			.role(Role.ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.build();
		Recruit recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.status(Status.PROCESS)
			.experience(1)
			.viewCount(200)
			.favoriteCount(100)
			.recruitDetail(recruitDetail)
			.company(company)
			.build();
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));

		// when
		recruitService.delete(1L, company);

		// then
		assertAll(
			() -> assertNotNull(recruitService),
			() -> assertEquals(Status.PROCESS, recruit.getStatus()),
			() -> verify(recruitRepository).delete(eq(recruit))
		);

	}

	@DisplayName("공고 단건 조회 테스트")
	@Test
	void searchTest() {
		// given
		RecruitDetail recruitDetail = RecruitDetail.builder()
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.build();
		User user = User.builder()
			.password("jobseek2021!")
			.contact("010-1234-5678")
			.nickname("잡식회사")
			.role(Role.ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.build();
		CompanyDetail companyDetail = CompanyDetail.builder()
			.longitude(30.0)
			.latitude(30.0)
			.description("기업소개")
			.address("서울시 마포구")
			.detailedAddress("지우로 3길")
			.avgSalary(3000)
			.homepage(null)
			.build();
		Company company = Company.builder()
			.password("jobseek2021!")
			.contact("010-1234-5678")
			.nickname("잡식회사")
			.role(Role.ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.companyDetail(companyDetail)
			.build();
		Recruit recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.status(Status.PROCESS)
			.experience(1)
			.viewCount(200)
			.favoriteCount(100)
			.recruitDetail(recruitDetail)
			.company(company)
			.build();
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));
		RecruitResponse expected = RecruitResponse.builder()
			.id(recruit.getId())
			.title(recruit.getTitle())
			.openDate(recruit.getOpenDate())
			.closeDate(recruit.getCloseDate())
			.createdDate(recruit.getCreatedDate())
			.modifiedDate(recruit.getModifiedDate())
			.status(recruit.getStatus())
			.thumbnail(recruit.getThumbnail())
			.experience(recruit.getExperience())
			.position(recruit.getRecruitDetail().getPosition())
			.content(recruit.getRecruitDetail().getContent())
			.tags(TagMap.toMap(recruit.getTags()))
			.viewCount(recruit.getViewCount())
			.favoriteCount(recruit.getFavoriteCount())
			.favorite(recruit.favoriteOf(user))
			.companyId(company.getId())
			.companyName(company.getCompanyName())
			.logoImage(company.getLogoImage())
			.scale(company.getScale())
			.description(company.getCompanyDetail().getDescription())
			.homepage(company.getCompanyDetail().getHomepage())
			.address(company.getCompanyDetail().getAddress())
			.avgSalary(company.getCompanyDetail().getAvgSalary())
			.latitude(company.getCompanyDetail().getLatitude())
			.longitude(company.getCompanyDetail().getLongitude())
			.build();
		int beforeViewCount = recruit.getViewCount();

		// when
		recruitService.findById(1L, user);

		// then
		assertAll(
			() -> assertNotNull(recruitService),
			() -> assertEquals(Status.PROCESS, expected.getStatus()),
			() -> assertEquals(beforeViewCount+1, recruit.getViewCount())
		);
	}
}
