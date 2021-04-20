package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeService {

	private final ResumeRepository resumeRepository;

	@Transactional
	public Long save(User user, ResumeRequest request) {
		Resume resume = new Resume(request.getOpen(), request.getCoverLetter(),
			request.getAddress(),
			request.getBlogUrl(), request.getGithubUrl(), request.getResumeImage());
		resume.setMember(user.getMember());
		request.getCareerList().forEach(resume::addCareer);
		request.getScholarList().forEach(resume::addScholar);
		request.getCertificateList().forEach(resume::addCertificate);
		return resumeRepository.save(resume).getId();
	}

	@Transactional
	public void update(Long id) {

	}

	@Transactional
	public void delete(Long id) {
		System.out.println("서비스");
		Resume resume = resumeRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서입니다."));
		resumeRepository.delete(resume);
	}
}
