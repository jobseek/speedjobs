package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.anyLong;
import static org.mockito.BDDMockito.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.verify;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
			.status(Status.DRAFT)
			.experience(1)
			.recruitDetail(new RecruitDetail())
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(9999, 12, 1, 0, 0, 0))
			.company(company)
			.build();
	}

	@DisplayName("공고 저장")
	@Test
	void save() {
		// given
		RecruitRequest recruitRequest = RecruitRequest.builder()
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.of(9999, 6, 20, 0, 0, 0))
			.build();
		given(recruitRepository.save(any(Recruit.class))).willReturn(recruit);

		// when
		Long savedId = recruitService.save(recruitRequest, company);

		// then
		assertEquals(recruit.getId(), savedId, "공고의 아이디와 저장된 값이 일치해야한다");
	}

	@DisplayName("공고 수정")
	@Test
	void update() {
		// given
		Long id = 1L;
		RecruitRequest recruitRequest = RecruitRequest
			.builder()
			.title("프론트엔드 신입 개발자 모집합니다.")
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.MAX)
			.build();
		given(recruitRepository.findById(id)).willReturn(Optional.of(recruit));

		// when
		recruitService.update(id, company, recruitRequest);

		// then
		assertAll(
			() -> assertEquals(id, recruit.getId(), "업데이트 된 공고의 id 와 요청한 id 값이 일치해야한다"),
			() -> assertEquals(recruitRequest.getTitle(), recruit.getTitle(),
				"업데이트를 요청한 제목과 업데이트된 공고의 제목이 일치해야한다")
		);
	}

	@DisplayName("공고 삭제")
	@Test
	void delete() {
		// given
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));

		// when
		recruitService.delete(1L, company);

		// then
		verify(recruitRepository).delete(eq(recruit));
	}

	@DisplayName("공고 단건 조회(본인이 조회했을 때)")
	@Test
	void searchMe() {
		// given
		given(recruitRepository.findById(anyLong())).willReturn(Optional.of(recruit));
		int beforeViewCount = recruit.getViewCount();

		// when
		recruitService.findById(1L, company);

		// then
		assertEquals(beforeViewCount, recruit.getViewCount(),
			"본인이 조회했기 때문에 이전 viewCount 값과 같아야 한다");
	}

	@DisplayName("공고 단건 조회(타인이 조회했을 때)")
	@Test
	void searchOther() {
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
		assertEquals(beforeViewCount + 1, recruit.getViewCount(),
			"다른 사람이 조회했기 때문에 이전 viewCount 에서 1 상승");
	}

	@DisplayName("공고 상태 변경")
	@Test
	void changeStatus() {
		// given
		List<Recruit> readyToOpen = new ArrayList<>();
		readyToOpen.add(recruit);
		given(recruitRepository.findAllByStatusAndOpenDateBefore(eq(Status.DRAFT),any()))
			.willReturn(readyToOpen);
		Status beforeStatus = readyToOpen.get(0).getStatus();

		// when
		recruitService.changeStatus();

		// then
		Status afterStatus = readyToOpen.get(0).getStatus();
		assertAll(
			() -> assertNotEquals(beforeStatus, afterStatus, "이전 상태값은 이후의 상태값과 같지않다."),
			() -> assertEquals(Status.PROCESS, afterStatus, "STANDBY 에서 PROCESS 로 변경")
		);
	}

	@DisplayName("찜하기")
	@Test
	void addFavorite() {
		// given
		Long id = 1L;
		given(recruitRepository.findById(id)).willReturn(Optional.of(recruit));
		final List<User> before = new ArrayList<>(recruit.getFavorites());
		int beforeCount = recruit.getFavoriteCount();

		// when
		recruitService.saveRecruitFavorite(id, company);
		final List<User> after = new ArrayList<>(recruit.getFavorites());

		// then
		assertAll(
			() -> assertTrue(before.isEmpty(), "찜하기 이전은 찜목록은 비어있어야 한다"),
			() -> assertFalse(after.isEmpty(), "찜한 이후의 찜목록은 비어있지 않아야 한다"),
			() -> assertEquals(beforeCount + 1, recruit.getFavoriteCount(),
				"찜하기 이전의 찜 개수는 이전값에서 1이 증가해야한다")
		);
	}

	@DisplayName("중복찜하기 예외발생")
	@Test
	void duplicateFavorite() {
		// given
		Long id = 1L;
		given(recruitRepository.findById(id)).willReturn(Optional.of(recruit));

		// when
		recruitService.saveRecruitFavorite(id, company);

		// then
		assertThrows(DuplicatedException.class,
			() -> recruitService.saveRecruitFavorite(id, company),
			"이미 찜목록에 공고가 있다면 중복 예외가 발생되어야 한다."
		);
	}

	@DisplayName("찜하기 취소")
	@Test
	void cancelFavorite() {
		// given
		Long id = 1L;
		given(recruitRepository.findById(id)).willReturn(Optional.of(recruit));
		recruitService.saveRecruitFavorite(id, company);
		final List<User> before = new ArrayList<>(recruit.getFavorites());

		// when
		recruitService.deleteRecruitFavorite(id, company);
		final List<User> after = new ArrayList<>(recruit.getFavorites());

		// then
		assertAll(
			() -> assertFalse(before.isEmpty(), "처음 찜 목록 확인시에는 비어있지 않아야 한다"),
			() -> assertTrue(after.isEmpty(), "찜하기 취소 후에는 찜 목록이 비어있어야한다")
		);
	}
}
