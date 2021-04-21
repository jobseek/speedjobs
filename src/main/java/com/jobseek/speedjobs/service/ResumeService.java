package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import java.util.List;
import java.util.stream.Collectors;
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

	//TODO 만들어야됨
	@Transactional
	public void update(Long resumeId, User user, ResumeRequest resumeRequest) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new IllegalArgumentException("해당 이력서는 존재하지 않습니다."));

	}

	@Transactional
	public void delete(Long id) {
		Resume resume = resumeRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서입니다."));
		resumeRepository.delete(resume);
	}

	@Transactional(readOnly = true)
	public ResumeResponse readById(Long resumeId) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서입니다."));
		return ResumeResponse.of(resume);
	}

	@Transactional(readOnly = true)
	public List<ResumeResponse> readAll() {
		return resumeRepository.findAll().stream()
			.map(ResumeResponse::new)
			.collect(Collectors.toList());
	}
}
