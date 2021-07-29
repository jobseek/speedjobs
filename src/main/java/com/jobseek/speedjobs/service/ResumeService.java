package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.member.Member;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ResumeService {

	private final ResumeRepository resumeRepository;
	private final ResumeQueryRepository resumeQueryRepository;
	private final TagService tagService;
	private final UserService userService;

	@Transactional
	public Long save(User user, ResumeRequest request) {
		Member member = userService.getMember(user.getId());
		Resume resume = request.toEntity(member);
		resume.addMoreInfo(
			request.getCareers(),
			request.getScholars(),
			request.getCertificates()
		);
		List<Tag> tags = getTags(request);
		resume.addTags(tags);
		return resumeRepository.save(resume).getId();
	}

	@Transactional
	public Resume update(Long resumeId, User user, ResumeRequest request) {
		Resume resume = getResume(resumeId);
		resume.getMember().verifyMe(user.getId());
		resume.update(request.toEntity(resume.getMember()));
		resume.updateMoreInfo(
			request.getCareers(),
			request.getScholars(),
			request.getCertificates()
		);
		List<Tag> tags = getTags(request);
		resume.updateTags(tags);
		return resume;
	}

	@Transactional
	public void delete(Long resumeId, User user) {
		Resume resume = getResume(resumeId);
		resume.getMember().verifyMe(user.getId());
		resumeRepository.delete(resume);
	}

	public Page<ResumeResponse> findAll(ResumeSearchCondition condition, Pageable pageable,
		User user) {
		return resumeQueryRepository.findAll(condition, pageable, user)
			.map(ResumeResponse::of);
	}

	public ResumeResponse findOne(Long resumeId) {
		Resume resume = getResume(resumeId);
		return ResumeResponse.of(resume);
	}

	public Resume getResume(Long id) {
		return resumeRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 이력서입니다."));
	}

	private List<Tag> getTags(ResumeRequest resumeRequest) {
		return tagService.getTagsByIds(resumeRequest.getTags());
	}
}
