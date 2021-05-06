package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.apply.ApplyResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ApplyService {

	private final ApplyRepository applyRepository;
	private final ResumeRepository resumeRepository;
	private final RecruitRepository recruitRepository;

	public Page<ApplyResponse> findRecruit(Long resumeId, User user, Pageable pageable) {
		Resume resume = resumeRepository.findById(resumeId)
			.orElseThrow(() -> new NotFoundException("해당 이력서가 없습니다."));
		Page<ApplyResponse> resultMap = applyRepository
			.findAllByMemberIdAndResumeId(user.getId(), resumeId, pageable)
			.map(ApplyResponse::of);
		if (resultMap.getContent().size() == 0) {
			throw new UnAuthorizedException("본인이 지원한 공고만 조회 가능합니다.");
		} else {
			return resultMap;
		}
	}

	public Page<ApplyResponse> findResume(Long recruitId, User user, Pageable pageable) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("해당 공고가 없습니다."));
		Page<ApplyResponse> resultMap = applyRepository
			.findAllByCompanyIdAndRecruitId(user.getId(), recruitId, pageable)
			.map(ApplyResponse::of);
		if (resultMap.getContent().size() == 0) {
			throw new UnAuthorizedException("자신의 회사가 올린 공고만 조회 가능합니다.");
		} else {
			return resultMap;
		}
	}

}
