package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ResumeService {

	private final ResumeRepository resumeRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public Long save(User user, ResumeRequest resumeRequest) {
		Resume resume = resumeRequest.toEntity();
		Member member = memberRepository.findById(user.getId())
			.orElseThrow(() -> new NotFoundException("존재하지 않는 회원입니다."));
		resume.setMember(member);
		resume.addMoreInfo(
			resumeRequest.getCareerList(),
			resumeRequest.getScholarList(),
			resumeRequest.getCertificateList()
		);
		return resumeRepository.save(resume).getId();
	}

	@Transactional
	public void update(Long resumeId, User user, ResumeRequest resumeRequest) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new NotFoundException("해당 이력서는 존재하지 않습니다."));
		if (!resume.getMember().getId().equals(user.getId())) {
			throw new UnAuthorizedException("권한이 없습니다.");
		}
		resume.update(resumeRequest.toEntity());
		resume.updateInfo(
			resumeRequest.getCareerList(),
			resumeRequest.getScholarList(),
			resumeRequest.getCertificateList()
		);
	}

	@Transactional
	public void delete(Long id, User user) {
		Resume resume = resumeRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 이력서입니다."));
		if (!resume.getMember().getId().equals(user.getId())) {
			throw new UnAuthorizedException("권한이 없습니다.");
		}
		resumeRepository.delete(resume);
	}

	public ResumeResponse findById(Long resumeId) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 이력서입니다."));
		return ResumeResponse.of(resume);
	}

	public List<ResumeResponse> findAll() {
		return resumeRepository.findAll().stream()
			.map(ResumeResponse::new)
			.collect(Collectors.toList());
	}
}
