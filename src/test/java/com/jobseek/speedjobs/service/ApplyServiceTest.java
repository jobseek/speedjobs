package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitDetail;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.dto.apply.CompanyResponse;
import com.jobseek.speedjobs.dto.apply.MemberResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
class ApplyServiceTest {

	private Apply apply;
	private Company company;
	private Recruit recruit;
	private Member author;
	private Resume resume;

	private ApplyService applyService;

	@Mock
	private ApplyRepository applyRepository;

	@Mock
	private ResumeService resumeService;

	@Mock
	private RecruitService recruitService;

	@BeforeEach
	void setUp() {
		applyService = new ApplyService(applyRepository, resumeService, recruitService);

		company = Company.builder()
			.id(1L)
			.companyName("??????")
			.role(ROLE_COMPANY)
			.companyDetail(CompanyDetail.builder().build())
			.build();
		recruit = Recruit.builder()
			.id(1L)
			.title("????????? ??????")
			.openDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.closeDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.experience(3)
			.recruitDetail(RecruitDetail.from(Position.PERMANENT, "????????? 10???"))
			.company(company)
			.build();
		author = Member.builder()
			.id(1L)
			.role(Role.ROLE_MEMBER)
			.build();
		resume = Resume.builder()
			.id(1L)
			.open(Open.NO)
			.coverLetter("Hello world")
			.title("????????? ??????")
			.name("?????????")
			.email("hong@gil.dong")
			.contact("010-0000-0000")
			.birth(LocalDate.now())
			.address("????????????")
			.member(author)
			.build();
		apply = Apply.builder()
			.memberId(1L)
			.companyId(1L)
			.recruit(recruit)
			.resume(resume)
			.build();
	}

	@DisplayName("?????? ????????? ????????? ?????? ??????")
	@Test
	void findAppliedRecruits() {
		given(resumeService.getResume(any())).willReturn(resume);
		given(applyRepository.findRecruitsByMemberIdAndResumeId(any(), any(), any()))
			.willReturn(new PageImpl<>(List.of(apply)));

		Page<CompanyResponse> responses = applyService
			.findAppliedRecruits(1L, author, Pageable.unpaged());

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("?????? ????????? ?????? ????????? ????????? ????????? ??????")
	@Test
	void findAppliedResumes() {
		given(recruitService.getRecruit(any())).willReturn(recruit);
		given(applyRepository.findResumesByCompanyIdAndRecruitId(any(), any(), any()))
			.willReturn(new PageImpl<>(List.of(apply)));

		Page<MemberResponse> responses = applyService
			.findAppliedResumes(1L, company, Pageable.unpaged());

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("?????? ????????? ????????????")
	@Test
	void save() {
		given(recruitService.getRecruit(any())).willReturn(recruit);
		given(resumeService.getResume(any())).willReturn(resume);

		applyService.save(1L, 1L, author);

		assertEquals(1, recruit.getApplies().size());
		assertEquals(1, resume.getApplies().size());
	}

	@DisplayName("?????? ????????? ?????? ??????")
	@Test
	void delete() {
		given(applyRepository.findByRecruitAndMember(any(), any())).willReturn(Optional.of(apply));
		doNothing().when(applyRepository).delete(apply);

		applyService.delete(1L, author);

		verify(applyRepository, times(1)).delete(apply);
	}
}
