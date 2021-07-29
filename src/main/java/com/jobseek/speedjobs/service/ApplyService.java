package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.BadRequestException;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.ForbiddenException;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.apply.CompanyResponse;
import com.jobseek.speedjobs.dto.apply.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ApplyService {

	private final ApplyRepository applyRepository;
	private final ResumeService resumeService;
	private final RecruitService recruitService;

	public Page<CompanyResponse> findAppliedRecruits(Long resumeId, User user, Pageable pageable) {
		Resume resume = resumeService.getResume(resumeId);
		if (!user.isAdmin() && resume.getMember() != user) {
			throw new ForbiddenException("본인이 지원한 공고만 조회 가능합니다.");
		}
		return applyRepository.findRecruitsByMemberIdAndResumeId(user.getId(), resumeId, pageable)
			.map(CompanyResponse::of);
	}

	public Page<MemberResponse> findAppliedResumes(Long recruitId, User user, Pageable pageable) {
		Recruit recruit = recruitService.getRecruit(recruitId);
		if (!user.isAdmin() && recruit.getCompany() != user) {
			throw new ForbiddenException("본인이 작성한 공고만 조회 가능합니다.");
		}
		return applyRepository.findResumesByCompanyIdAndRecruitId(user.getId(), recruitId, pageable)
			.map(MemberResponse::of);
	}

	@Transactional
	public void save(Long recruitId, Long resumeId, User user) {
		Recruit recruit = recruitService.getRecruit(recruitId);
		Resume resume = resumeService.getResume(resumeId);
		resume.getMember().verifyMe(user.getId());
		if (recruit.isApplied(user.getId())) {
			throw new DuplicatedException("이미 지원한 공고입니다.");
		}
		resume.apply(recruit);
	}

	@Transactional
	public void delete(Long recruitId, User user) {
		Apply apply = applyRepository.findByRecruitAndMember(recruitId, user.getId())
			.orElseThrow(() -> new BadRequestException("지원하지 않은 공고입니다."));
		applyRepository.delete(apply);
	}
}
