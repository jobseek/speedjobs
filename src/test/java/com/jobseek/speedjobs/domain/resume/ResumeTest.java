package com.jobseek.speedjobs.domain.resume;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class ResumeTest {

	@Autowired
	ResumeRepository resumeRepository;

	@Autowired
	MemberRepository memberRepository;

	/**
	* JPA 연관관계 편의 메서드 테스트
	*/
	@Test
	@DisplayName("JPA 연관관계 편의메서드 테스트")
	@Commit
	public void methodTest() {
		// given
		Member member = memberRepository.findById(1L).get();
		Resume resume = Resume.builder()
			.open(Open.YES)
			.coverLetter("안녕하세요.")
			.title("카카오 이력서")
			.name("이승복")
			.gender("M")
			.contact("010-3323-2352")
			.birth(LocalDate.of(1992,5,30))
			.address("서울시 강북구 번동")
			.blogUrl("https://www.naver.com")
			.githubUrl("https://www.github.com/lsb530")
			.resumeImage("https://google.com/image1.jpg")
			.build();
		Certificate certificate = new Certificate();
		certificate.setCertName("정보처리기사");
		certificate.setCertDate(LocalDateTime.now());
		certificate.setCertNumber("111-22-33333");

		List<Certificate> certificates = new ArrayList<>();
		List<Scholar> scholars = new ArrayList<>();
		List<Career> careers = new ArrayList<>();

		certificates.add(certificate);
		resume.addMoreInfo(careers, scholars, certificates);

		// then(1)
		assertThat(resume.getMember()).isEqualTo(null);

		// 연관관계 편의 메서드
		resume.setMember(member);

		// then(2)
		assertThat(resume.getMember()).extracting("birth").isEqualTo(LocalDate.of(1992,5,30));
		assertThat(member.getResumeList().size()).isEqualTo(1);
		assertThat(resumeRepository.save(resume).getId()).isEqualTo(1L);
	}
}
