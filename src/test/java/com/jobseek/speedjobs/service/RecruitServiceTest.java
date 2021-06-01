package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.recruit.Status.DRAFT;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.anyLong;
import static org.mockito.BDDMockito.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.lenient;
import static org.mockito.BDDMockito.verify;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitDetail;
import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(MockitoExtension.class)
class RecruitServiceTest {

	private RecruitService recruitService;

	@Mock
	private RecruitRepository recruitRepository;

	@Mock
	private RecruitQueryRepository recruitQueryRepository;

	@Mock
	private TagService tagService;

	@Mock
	private UserService userService;

	private Recruit recruit;

	private Company company;

	@BeforeEach
	void setUp() {
		recruitService = new RecruitService(recruitRepository, recruitQueryRepository, tagService,
			userService);
		company = Company.builder()
			.id(1L)
			.email("company@company.com")
			.password("jobseek2021!")
			.name("잡식회사")
			.nickname("잡식회사")
			.contact("010-1234-5678")
			.role(ROLE_COMPANY)
			.scale(100)
			.companyDetail(new CompanyDetail())
			.build();
		recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.status(DRAFT)
			.experience(1)
			.recruitDetail(new RecruitDetail())
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(9999, 12, 1, 0, 0, 0))
			.company(company)
			.build();
	}

	@DisplayName("공고 등록")
	@Test
	void saveRecruit() {
		// given
		RecruitRequest recruitRequest = RecruitRequest.builder()
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(9999, 6, 20, 0, 0, 0))
			.build();
		given(recruitRepository.save(any(Recruit.class))).willReturn(recruit);

		// when
		Long savedId = recruitService.save(recruitRequest, company);

		// then
		assertEquals(recruit.getId(), savedId);
	}

	@DisplayName("공고 수정")
	@Test
	void updateRecruit() {
		// given
		Long id = 1L;
		RecruitRequest recruitRequest = RecruitRequest.builder()
			.title("프론트엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.MAX)
			.build();
		given(recruitRepository.findById(id)).willReturn(Optional.of(recruit));

		// when
		recruitService.update(id, company, recruitRequest);

		// then
		assertAll(
			() -> assertEquals(id, recruit.getId()),
			() -> assertEquals(recruitRequest.getTitle(), recruit.getTitle())
		);
	}

	@DisplayName("공고 삭제")
	@Test
	void deleteRecruit() {
		// given
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));

		// when
		recruitService.delete(1L, company);

		// then
		assertAll(
			() -> verify(recruitRepository).delete(eq(recruit))
		);
	}

	@Transactional(readOnly = true)
	@DisplayName("공고 단건 조회(본인이 조회했을 때)")
	@Test
	void searchByMyself() {
		// given
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));
		int beforeViewCount = recruit.getViewCount();

		// when
		recruitService.findById(1L, company);

		// then
		assertAll(
			() -> assertEquals(beforeViewCount, recruit.getViewCount())
		);
	}

	@DisplayName("공고 단건 조회(타인이 조회했을 때)")
	@Test
	void searchByOther() {
		// given
		User other = User.builder()
			.id(2L)
			.role(ROLE_COMPANY)
			.build();
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));

		int beforeViewCount = recruit.getViewCount();

		// when
		recruitService.findById(1L, other);

		// then
		assertAll(
			() -> assertEquals(beforeViewCount + 1, recruit.getViewCount())
		);
	}

	@DisplayName("상태 변경")
	@Test
	void change_status_Test() {
		List<Recruit> readyOpenRecruits = new ArrayList<>();
		List<Recruit> readyCloseRecruits = new ArrayList<>();
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
			.role(ROLE_COMPANY)
			.name("잡식회사")
			.email("company@company.com")
			.companyDetail(companyDetail)
			.build();
		RecruitDetail recruitDetail = RecruitDetail.builder()
			.position(Position.PERMANENT)
			.content("저희 회사 백엔드 모집해요.")
			.build();
		Recruit recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now().minusMinutes(1L))
			.closeDate(LocalDateTime.of(2021, 6, 20, 0, 0, 0))
			.status(Status.DRAFT)
			.experience(1)
			.recruitDetail(recruitDetail)
			.company(company)
			.build();
		Recruit recruit1 = Recruit.builder()
			.id(1L)
			.title("백엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.of(2021, 3, 20, 0, 0, 0))
			.closeDate(LocalDateTime.now().plusMinutes(1L))
			.status(Status.PROCESS)
			.experience(1)
			.recruitDetail(recruitDetail)
			.company(company)
			.build();
		readyOpenRecruits.add(recruit);
		readyCloseRecruits.add(recruit1);
		List<Status> beforeStatus1 = readyOpenRecruits.stream().map(Recruit::getStatus)
			.collect(Collectors.toList());
		List<Status> beforeStatus2 = readyCloseRecruits.stream().map(Recruit::getStatus)
			.collect(Collectors.toList());
		lenient().when(recruitRepository
			.findAllByStatusAndOpenDateBefore(Status.DRAFT, LocalDateTime.now().minusDays(1L)))
			.thenReturn(readyOpenRecruits);
		lenient().when(recruitRepository
			.findAllByStatusAndCloseDateBefore(Status.PROCESS, LocalDateTime.now().plusMinutes(1L)))
			.thenReturn(readyCloseRecruits);
		readyOpenRecruits.forEach(r -> r.changeStatus(Status.PROCESS));
		readyCloseRecruits.forEach(r -> r.changeStatus(Status.END));
		recruitService.changeStatus();
		List<Status> afterStatus1 = readyOpenRecruits.stream().map(Recruit::getStatus)
			.collect(Collectors.toList());
		List<Status> afterStatus2 = readyCloseRecruits.stream().map(Recruit::getStatus)
			.collect(Collectors.toList());
		assertNotEquals(beforeStatus1, afterStatus1);
		assertNotEquals(beforeStatus2, afterStatus2);
	}

}
