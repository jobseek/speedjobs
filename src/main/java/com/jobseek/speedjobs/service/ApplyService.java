package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.apply.CompanyResponse;
import com.jobseek.speedjobs.dto.apply.MemberResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ApplyService {

	private final ApplyRepository applyRepository;
	private final ResumeRepository resumeRepository;
	private final RecruitRepository recruitRepository;

	/**
	* 멤버가 지원한 공고들을 조회
	*/
	public Page<CompanyResponse> findRecruits(Long resumeId, User user, Pageable pageable) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new NotFoundException("해당 이력서가 없습니다."));
		Page<CompanyResponse> page = applyRepository
			.findRecruitsByMemberIdAndResumeId(user.getId(), resumeId, pageable)
			.map(CompanyResponse::of);
		if (ObjectUtils.isEmpty(page.getContent())) {
			throw new UnAuthorizedException("본인이 지원한 공고만 조회 가능합니다.");
		} else {
			return page;
		}
	}

	/**
	* 공고에 지원된 이력서들을 조회
	*/
	public Page<MemberResponse> findResumes(Long recruitId, User user, Pageable pageable) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("해당 공고가 없습니다."));
		Page<MemberResponse> page = applyRepository
			.findResumesByCompanyIdAndRecruitId(user.getId(), recruitId, pageable)
			.map(MemberResponse::of);
		if (ObjectUtils.isEmpty(page.getContent())) {
			throw new UnAuthorizedException("자신의 회사가 올린 공고만 조회 가능합니다.");
		} else {
			return page;
		}
	}

}
