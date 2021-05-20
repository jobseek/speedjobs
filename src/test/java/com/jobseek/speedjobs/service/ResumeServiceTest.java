package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;
import groovy.util.logging.Slf4j;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class ResumeServiceTest {

	@Autowired
	ResumeService resumeService;
	@Autowired
	ResumeRepository resumeRepository;
	@Autowired
	RecruitRepository recruitRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	EntityManager em;

	@Commit
	@Test
//	@RepeatedTest(2)
	public void applyTest() {
		Resume resume1 = resumeRepository.findById(1L)
			.orElseThrow(() -> new NotFoundException(""));
		Resume resume2 = resumeRepository.findById(2L)
			.orElseThrow(() -> new NotFoundException(""));
		Recruit recruit = recruitRepository.findById(1L)
			.orElseThrow(() -> new NotFoundException(""));
		resume1.applyTo(recruit);
		resume2.applyTo(recruit);
	}

	@Test
	@Commit
	public void cancelTest() {
		Resume resume1 = resumeRepository.findById(1L)
			.orElseThrow(() -> new NotFoundException(""));
		Resume resume2 = resumeRepository.findById(2L)
			.orElseThrow(() -> new NotFoundException(""));
		Recruit recruit = recruitRepository.findById(1L)
			.orElseThrow(() -> new NotFoundException(""));
		resume1.applyTo(recruit);
		resume2.applyTo(recruit);
		em.flush();
//		System.out.println("resume1.getApplies().size() = " + resume1.getApplies().size());
//		System.out.println("resume2.getApplies().size() = " + resume2.getApplies().size());
//		System.out.println("recruit.getApplies().size() = " + recruit.getApplies().size());
//		System.out.println("resume1.getApplies() = " + resume1.getApplies());
//		System.out.println("resume2.getApplies() = " + resume2.getApplies());
		resume1.getApplies().clear();
//		resume2.getApplies().clear();
//		System.out.println("resume.getApplies() = " + resume1.getApplies());
//		System.out.println("resume.getApplies() = " + resume2.getApplies());
//		System.out.println("resume.getApplies().size() = " + resume1.getApplies().size());
//		System.out.println("resume.getApplies().size() = " + resume2.getApplies().size());
//		System.out.println("recruit.getApplies() = " + recruit.getApplies());
//		System.out.println("recruit.getApplies().size() = " + recruit.getApplies().size());
//		recruit.getApplies().clear();
//		System.out.println("recruit.getApplies() = " + recruit.getApplies());
//		System.out.println("recruit.getApplies().size() = " + recruit.getApplies().size());
//		resume.cancelApplyFrom(recruit);
	}
}
