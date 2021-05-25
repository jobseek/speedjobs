package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.ForbiddenException;
import com.jobseek.speedjobs.domain.recruit.Recruit;
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

	/**
	 * 멤버가 지원한 공고들을 조회
	 */
	public Page<CompanyResponse> findRecruits(Long resumeId, User user, Pageable pageable) {
		Resume resume = resumeService.findOne(resumeId);
		if (!user.isAdmin() && resume.getMember() != user) {
			throw new ForbiddenException("본인이 지원한 공고만 조회 가능합니다.");
		}
		return applyRepository.findRecruitsByMemberIdAndResumeId(user.getId(), resumeId, pageable)
			.map(CompanyResponse::of);
	}

	/**
	 * 공고에 지원된 이력서들을 조회
	 */
	public Page<MemberResponse> findResumes(Long recruitId, User user, Pageable pageable) {
		Recruit recruit = recruitService.findOne(recruitId);
		if (!user.isAdmin() && recruit.getCompany() != user) {
			throw new ForbiddenException("본인이 작성한 공고만 조회 가능합니다.");
		}
		return applyRepository.findResumesByCompanyIdAndRecruitId(user.getId(), recruitId, pageable)
			.map(MemberResponse::of);
	}

}
