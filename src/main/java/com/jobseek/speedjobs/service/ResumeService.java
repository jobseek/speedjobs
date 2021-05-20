package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.BadRequestException;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.ApplyRepository;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.ResumeQueryRepository;
import com.jobseek.speedjobs.domain.resume.ResumeRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import com.jobseek.speedjobs.dto.resume.ResumeSearchCondition;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ResumeService {

	private final ResumeRepository resumeRepository;
	private final ResumeQueryRepository resumeQueryRepository;
	private final ApplyRepository applyRepository;
	private final TagService tagService;
	private final UserService userService;
	private final RecruitService recruitService;

	@Transactional
	public Long save(User user, ResumeRequest resumeRequest) {
		Resume resume = resumeRequest.toEntity();
		Member member = userService.findMember(user.getId());
		resume.setMember(member);
		resume.addMoreInfo(
			resumeRequest.getCareers(),
			resumeRequest.getScholars(),
			resumeRequest.getCertificates()
		);
		List<Tag> tags = getTags(resumeRequest);
		resume.addTags(tags);
		return resumeRepository.save(resume).getId();
	}

	@Transactional
	public void update(Long resumeId, User user, ResumeRequest resumeRequest) {
		Resume resume = findOne(resumeId);
		resume.getMember().validateMe(user.getId());
		resume.update(resumeRequest.toEntity());
		resume.updateMoreInfo(
			resumeRequest.getCareers(),
			resumeRequest.getScholars(),
			resumeRequest.getCertificates()
		);
		List<Tag> tags = getTags(resumeRequest);
		resume.updateTags(tags);
	}

	@Transactional
	public void delete(Long resumeId, User user) {
		Resume resume = findOne(resumeId);
		resume.getMember().validateMe(user.getId());
		resumeRepository.delete(resume);
	}

	public Page<ResumeResponse> findAll(ResumeSearchCondition condition, Pageable pageable,
		User user) {
		return resumeQueryRepository.findAll(condition, pageable, user)
			.map(ResumeResponse::of);
	}

	public ResumeResponse findById(Long resumeId) {
		Resume resume = findOne(resumeId);
		return ResumeResponse.of(resume);
	}

	@Transactional
	public void apply(Long recruitId, Long resumeId, User user) {
		Recruit recruit = recruitService.findOne(recruitId);
		Resume resume = findOne(resumeId);
		resume.getMember().validateMe(user.getId());
		if (recruit.applied(user.getId())) {
			throw new DuplicatedException("이미 지원한 공고입니다.");
		}
		resume.applyTo(recruit);
	}

	@Transactional
	public void cancelApply(Long recruitId, User user) {
		Apply apply = applyRepository.findByRecruitAndMember(recruitId, user.getId())
			.orElseThrow(() -> new BadRequestException("지원하지 않은 공고입니다."));
		applyRepository.delete(apply);
	}

	public Resume findOne(Long id) {
		return resumeRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 이력서입니다."));
	}

	private List<Tag> getTags(ResumeRequest resumeRequest) {
		return tagService.findTagsById(resumeRequest.getTags());
	}
}
