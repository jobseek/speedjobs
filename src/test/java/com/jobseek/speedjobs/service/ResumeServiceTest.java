package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.resume.Open.*;
import static com.jobseek.speedjobs.domain.user.Provider.*;
import static com.jobseek.speedjobs.domain.user.Role.*;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeQueryRepository;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.UserRepository;
import groovy.util.logging.Slf4j;
import java.time.LocalDate;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

@ExtendWith(MockitoExtension.class)
class ResumeServiceTest {

	private ResumeService resumeService;

	@Mock
	ResumeRepository resumeRepository;

	@Mock
	ResumeQueryRepository resumeQueryRepository;

	@Mock
	ApplyRepository applyRepository;

	@Mock
	TagService tagService;

	@Mock
	UserService userService;

	@Mock
	RecruitService recruitService;

	private Resume resume;

	private Member member;

	@BeforeEach
	void setUp() {
		resumeService = new ResumeService(
			resumeRepository,resumeQueryRepository,
			applyRepository,tagService,
			userService,recruitService);
		member = Member.builder()
			.id(1L)
			.email("member@member.com")
			.password("jobseek2021!")
			.name("잡식멤버")
			.nickname("잡식이")
			.gender("M")
			.birth(LocalDate.of(1992,5,30))
			.bio("반갑습니다")
			.provider(LOCAL)
			.contact("010-1234-5678")
			.role(ROLE_MEMBER)
			.build();
		resume = Resume.builder()
			.id(1L)
			.open(YES)
			.title("카카오 지원 이력서")
			.coverLetter("안녕하세요. 열정으로 도전하는 젊은 인재입니다")
			.email("speedjobs@naver.com")
			.contact("010-5252-2125")
			.name("김영식")
			.gender("M")
			.build();
	}

//	@Commit
//	@Test
////	@RepeatedTest(2)
//	public void applyTest() {
//		Resume resume1 = resumeRepository.findById(1L)
//			.orElseThrow(() -> new NotFoundException(""));
//		Resume resume2 = resumeRepository.findById(2L)
//			.orElseThrow(() -> new NotFoundException(""));
//		Recruit recruit = recruitRepository.findById(1L)
//			.orElseThrow(() -> new NotFoundException(""));
//		resume1.applyTo(recruit);
//		resume2.applyTo(recruit);
//	}
//
//	@Test
//	@Commit
//	public void cancelTest() {
//		Resume resume1 = resumeRepository.findById(1L)
//			.orElseThrow(() -> new NotFoundException(""));
//		Resume resume2 = resumeRepository.findById(2L)
//			.orElseThrow(() -> new NotFoundException(""));
//		Recruit recruit = recruitRepository.findById(1L)
//			.orElseThrow(() -> new NotFoundException(""));
//		resume1.applyTo(recruit);
//		resume2.applyTo(recruit);
//		em.flush();
//		resume1.getApplies().clear();
//	}
}
