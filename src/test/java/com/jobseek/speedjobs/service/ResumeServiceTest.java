package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeQueryRepository;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;

@ExtendWith(MockitoExtension.class)
class ResumeServiceTest {

	private Resume resume;
	private Member author;

	private ResumeService resumeService;

	@Mock
	private ResumeRepository resumeRepository;

	@Mock
	private ResumeQueryRepository resumeQueryRepository;

	@Mock
	private TagService tagService;

	@Mock
	private UserService userService;

	@BeforeEach
	void setUp() {
		resumeService = new ResumeService(resumeRepository, resumeQueryRepository, tagService,
			userService);

		author = Member.builder()
			.id(1L)
			.email("member@member.com")
			.password("memberTest1!")
			.role(ROLE_MEMBER)
			.build();
		resume = Resume.builder()
			.id(1L)
			.open(Open.NO)
			.coverLetter("Hello world")
			.title("개발이 좋아")
			.name("홍길동")
			.email("hong@gil.dong")
			.contact("010-0000-0000")
			.birth(LocalDate.now())
			.address("대한민국")
			.member(author)
			.build();
	}

	@DisplayName("이력서 등록")
	@Test
	void save() {
		ResumeRequest request = ResumeRequest.builder()
			.open(resume.getOpen())
			.coverLetter(resume.getCoverLetter())
			.title(resume.getTitle())
			.name(resume.getName())
			.email(resume.getEmail())
			.contact(resume.getContact())
			.birth(resume.getBirth())
			.address(resume.getAddress())
			.build();
		given(userService.getMember(any())).willReturn(author);
		given(resumeRepository.save(any(Resume.class))).willReturn(resume);

		Long id = resumeService.save(author, request);

		assertEquals(1L, id);
	}

	@DisplayName("이력서 수정")
	@Test
	void update() {
		ResumeRequest request = ResumeRequest.builder()
			.open(Open.YES)
			.coverLetter(resume.getCoverLetter())
			.title("신입 개발자")
			.name(resume.getName())
			.email(resume.getEmail())
			.contact(resume.getContact())
			.birth(resume.getBirth())
			.address("미국")
			.build();
		given(resumeRepository.findById(any())).willReturn(Optional.of(resume));

		Resume update = resumeService.update(1L, author, request);

		assertAll(
			() -> assertEquals(resume.getId(), update.getId()),
			() -> assertEquals(request.getOpen(), update.getOpen()),
			() -> assertEquals(request.getEmail(), update.getEmail()),
			() -> assertEquals(request.getTitle(), update.getTitle()),
			() -> assertEquals(request.getAddress(), update.getAddress())
		);
	}

	@DisplayName("이력서 삭제")
	@Test
	void delete() {
		given(resumeRepository.findById(any())).willReturn(Optional.of(resume));
		doNothing().when(resumeRepository).delete(resume);

		resumeService.delete(1L, author);

		verify(resumeRepository, times(1)).delete(resume);
	}

	@DisplayName("이력서 전체 조회")
	@Test
	void findAll() {
		given(resumeQueryRepository.findAll(any(), any(), any(User.class)))
			.willReturn(new PageImpl<>(List.of(resume)));

		List<ResumeResponse> responses = resumeService.findAll(null, null, author).toList();

		assertAll(
			() -> assertEquals(resume.getId(), responses.get(0).getId()),
			() -> assertEquals(resume.getOpen(), responses.get(0).getOpen()),
			() -> assertEquals(resume.getBlogUrl(), responses.get(0).getBlogUrl()),
			() -> assertEquals(resume.getGithubUrl(), responses.get(0).getGithubUrl())
		);
	}

	@DisplayName("이력서 단일 조회")
	@Test
	void findOne() {
		given(resumeRepository.findById(any())).willReturn(Optional.of(resume));

		ResumeResponse response = resumeService.findOne(1L);

		assertAll(
			() -> assertEquals(resume.getId(), response.getId()),
			() -> assertEquals(resume.getOpen(), response.getOpen()),
			() -> assertEquals(resume.getBlogUrl(), response.getBlogUrl()),
			() -> assertEquals(resume.getGithubUrl(), response.getGithubUrl())
		);
	}

	@DisplayName("이력서 조회")
	@Test
	void getResume() {
		given(resumeRepository.findById(any())).willReturn(Optional.of(resume));

		Resume found = resumeService.getResume(1L);

		assertAll(
			() -> assertEquals(resume.getId(), found.getId()),
			() -> assertEquals(resume.getOpen(), found.getOpen()),
			() -> assertEquals(resume.getBlogUrl(), found.getBlogUrl()),
			() -> assertEquals(resume.getGithubUrl(), found.getGithubUrl())
		);
	}
}
