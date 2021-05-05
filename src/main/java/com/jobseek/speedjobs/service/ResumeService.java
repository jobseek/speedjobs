package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import java.util.List;
import java.util.Objects;
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
	private final RecruitRepository recruitRepository;
	private final ApplyRepository applyRepository;

	@Transactional
	public Long save(User user, ResumeRequest resumeRequest) {
		Resume resume = resumeRequest.toEntity();
		Member member = memberRepository.findById(user.getId())
			.orElseThrow(() -> new NotFoundException("존재하지 않는 회원입니다."));
		resume.setMember(member);
		resume.addMoreInfo(
			resumeRequest.getCareerList(),
			resumeRequest.getScholarList(),
			resumeRequest.getCertificateList(),
			resumeRequest.getTagIds()
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
			resumeRequest.getCertificateList(),
			resumeRequest.getTagIds()
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

	@Transactional
	public void apply(Long recruitId, Long resumeId, User user) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 공고입니다."));
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 이력서입니다."));
		Member member = memberRepository.findById(user.getId())
			.orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));
		if (user != resume.getMember()) {
			throw new UnAuthorizedException("본인만 지원할 수 있습니다.");
		}
		boolean duplicatedCheck = recruit.getApplies().stream()
			.anyMatch(apply -> Objects.equals(apply.getMemberId(), user.getId()));
		if (!duplicatedCheck) {
			resume.applyTo(recruit);
		} else {
			throw new DuplicatedException("이미 지원한 공고입니다.");
		}
	}

	@Transactional
	public void cancelApply(Long recruitId, User user) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 공고입니다."));
		Member member = memberRepository.findById(user.getId())
			.orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));
		Apply apply = applyRepository.findByRecruitAndMember(recruitId, user.getId())
			.orElseThrow(() -> new UnAuthorizedException("지원한 적이 없는 공고입니다."));
		applyRepository.delete(apply);
	}
}
