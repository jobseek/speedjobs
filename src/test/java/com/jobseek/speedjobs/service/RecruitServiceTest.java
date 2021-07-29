package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

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
import com.jobseek.speedjobs.dto.recruit.RecruitListResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.assertj.core.util.Lists;
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
class RecruitServiceTest {

	private Recruit recruit;
	private Company company;
	private Tag tag;

	private RecruitService recruitService;

	@Mock
	private RecruitRepository recruitRepository;

	@Mock
	private RecruitQueryRepository recruitQueryRepository;

	@Mock
	private TagService tagService;

	@Mock
	private UserService userService;

	@BeforeEach
	void setUp() {
		recruitService = new RecruitService(recruitRepository, recruitQueryRepository, tagService,
			userService);

		company = Company.builder()
			.id(1L)
			.companyName("구글")
			.role(ROLE_COMPANY)
			.companyDetail(CompanyDetail.builder().build())
			.build();
		recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 모집")
			.openDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.closeDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.experience(3)
			.recruitDetail(RecruitDetail.from(Position.PERMANENT, "선착순 10명"))
			.company(company)
			.build();
		tag = Tag.builder()
			.name("백엔드")
			.type(Type.POSITION)
			.build();
	}

	@DisplayName("공고 등록")
	@Test
	void save() {
		RecruitRequest request = RecruitRequest.builder()
			.title(recruit.getTitle())
			.openDate(recruit.getOpenDate())
			.closeDate(recruit.getCloseDate())
			.experience(recruit.getExperience())
			.position(recruit.getRecruitDetail().getPosition())
			.content(recruit.getRecruitDetail().getContent())
			.tagIds(List.of(1L))
			.build();
		given(userService.getCompany(any())).willReturn(company);
		given(tagService.getTagsByIds(any())).willReturn(List.of(tag));
		given(recruitRepository.save(any(Recruit.class))).willReturn(recruit);

		Recruit save = recruitService.save(request, company);

		assertAll(
			() -> assertEquals(1L, save.getId()),
			() -> assertEquals(Status.REGULAR, save.getStatus()),
			() -> assertEquals(request.getTitle(), save.getTitle()),
			() -> assertEquals(request.getOpenDate(), save.getOpenDate()),
			() -> assertEquals(request.getCloseDate(), save.getCloseDate()),
			() -> assertEquals(request.getPosition(), save.getRecruitDetail().getPosition()),
			() -> assertEquals(request.getContent(), save.getRecruitDetail().getContent())
		);
	}

	@DisplayName("공고 수정")
	@Test
	void update() {
		RecruitRequest request = RecruitRequest.builder()
			.title(recruit.getTitle())
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.now().plusDays(14L))
			.experience(5)
			.position(Position.TEMPORARY)
			.content("선착순 20명")
			.tagIds(List.of(1L))
			.build();
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));
		given(tagService.getTagsByIds(any())).willReturn(List.of(tag));

		Recruit update = recruitService.update(1L, company, request);

		assertAll(
			() -> assertEquals(recruit.getId(), update.getId()),
			() -> assertEquals(Status.PROCESS, update.getStatus()),
			() -> assertEquals(request.getTitle(), update.getTitle()),
			() -> assertEquals(request.getOpenDate(), update.getOpenDate()),
			() -> assertEquals(request.getCloseDate(), update.getCloseDate()),
			() -> assertEquals(request.getExperience(), update.getExperience()),
			() -> assertEquals(request.getPosition(), update.getRecruitDetail().getPosition()),
			() -> assertEquals(request.getContent(), update.getRecruitDetail().getContent()),
			() -> assertEquals(List.of(tag), update.getTags())
		);
	}

	@DisplayName("공고 삭제")
	@Test
	void delete() {
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));
		doNothing().when(recruitRepository).delete(recruit);

		recruitService.delete(1L, company);

		verify(recruitRepository, times(1)).delete(recruit);
	}

	@DisplayName("공고 단일 조회")
	@Test
	void findOne() {
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));

		RecruitResponse response = recruitService.findOne(1L, company);

		assertAll(
			() -> assertEquals(recruit.getId(), response.getId()),
			() -> assertEquals(recruit.getTitle(), response.getTitle()),
			() -> assertEquals(recruit.getOpenDate(), response.getOpenDate()),
			() -> assertEquals(recruit.getCloseDate(), response.getCloseDate()),
			() -> assertEquals(recruit.getExperience(), response.getExperience()),
			() -> assertEquals(recruit.getRecruitDetail().getPosition(), response.getPosition()),
			() -> assertEquals(recruit.getRecruitDetail().getContent(), response.getContent())
		);
	}

	@DisplayName("공고 전체 조회")
	@Test
	void findAll() {
		given(recruitQueryRepository.findAll(any(), any()))
			.willReturn(new PageImpl<>(List.of(recruit)));

		Page<RecruitResponse> responses = recruitService.findAll(null, null, company);

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("공고 상태 스케쥴링 - 모집 시작")
	@Test
	void openScheduling() {
		Recruit draft = Recruit.builder()
			.id(1L)
			.title("백엔드 모집")
			.company(company)
			.openDate(LocalDateTime.now())
			.closeDate(LocalDateTime.now().plusDays(14L))
			.experience(3)
			.recruitDetail(RecruitDetail.from(Position.PERMANENT, "선착순 10명"))
			.build();
		given(recruitRepository
			.findAllByStatusAndOpenDateBefore(any(Status.class), any(LocalDateTime.class)))
			.willReturn(List.of(draft));

		recruitService.openScheduling();

		assertEquals(Status.PROCESS, draft.getStatus());
	}

	@DisplayName("공고 상태 스케쥴링 - 모집 종료")
	@Test
	void closeScheduling() {
		Recruit process = Recruit.builder()
			.id(1L)
			.title("프론트엔드 모집")
			.company(company)
			.openDate(LocalDateTime.now().minusDays(14L))
			.closeDate(LocalDateTime.now())
			.experience(3)
			.recruitDetail(RecruitDetail.from(Position.PERMANENT, "선착순 10명"))
			.build();
		given(recruitRepository
			.findAllByStatusAndCloseDateBefore(any(Status.class), any(LocalDateTime.class)))
			.willReturn(List.of(process));

		recruitService.closeScheduling();

		assertEquals(Status.END, process.getStatus());
	}

	@DisplayName("공고 찜하기")
	@Test
	void saveRecruitFavorite() {
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));

		recruitService.saveRecruitFavorite(1L, company);

		assertAll(
			() -> assertEquals(1, recruit.getFavoriteCount()),
			() -> assertEquals(List.of(recruit), company.getRecruitFavorites()),
			() -> assertEquals(List.of(company), recruit.getFavorites()),
			() -> assertTrue(recruit.favoriteOf(company))
		);
	}

	@DisplayName("공고 찜하기 취소")
	@Test
	void deleteRecruitFavorite() {
		recruit.addFavorite(company);
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));

		recruitService.deleteRecruitFavorite(1L, company);

		assertAll(
			() -> assertEquals(0, recruit.getFavoriteCount()),
			() -> assertEquals(Lists.emptyList(), company.getRecruitFavorites()),
			() -> assertEquals(Lists.emptyList(), recruit.getFavorites()),
			() -> assertFalse(recruit.favoriteOf(company))
		);
	}

	@DisplayName("공고 찜 목록 조회")
	@Test
	void findRecruitFavorites() {
		recruit.addFavorite(company);
		given(recruitRepository.findAllByFavoritesContains(any(), any()))
			.willReturn(new PageImpl<>(List.of(recruit)));

		Page<RecruitListResponse> responses = recruitService
			.findRecruitFavorites(Pageable.unpaged(), company);

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("공고 조회")
	@Test
	void getRecruit() {
		given(recruitRepository.findById(any())).willReturn(Optional.of(recruit));

		Recruit found = recruitService.getRecruit(1L);

		assertEquals(1L, found.getId());
	}
}
