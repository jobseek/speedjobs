package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_ADMIN;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.tag.RecruitTag;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RecruitService {

	private final RecruitRepository recruitRepository;
	private final CompanyRepository companyRepository;
	private final TagRepository tagRepository;

	@Transactional
	public Long save(RecruitRequest recruitRequest, User user) {
		Recruit recruit = recruitRequest.toEntity();
		Company company = companyRepository.findById(user.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기업회원입니다."));
		recruit.setCompany(company);
		List<Tag> tags = getTagsById(recruitRequest.getTagIds());
		createRecruitTags(recruit, tags);
		return recruitRepository.save(recruit).getId();
	}

	@Transactional
	public void update(Long recruitId, User user, RecruitRequest recruitRequest) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new IllegalArgumentException("해당 공고가 없습니다."));
		Company company = companyRepository.findById(user.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기업회원입니다."));
		if (recruit.getCompany().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		List<Tag> tags = getTagsById(recruitRequest.getTagIds());
		recruit.update(recruitRequest.toEntity(), tags);
	}

	@Transactional
	public void delete(Long recruitId, User user) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(
				() -> new IllegalArgumentException("해당 게시글이 없습니다.  recruitId=" + recruitId));
		if (user.getRole() != ROLE_ADMIN && recruit.getCompany().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		recruitRepository.delete(recruit);
	}

	public RecruitResponse readById(Long recruitId) {
		Recruit recruit = recruitRepository.findById(recruitId)
			.orElseThrow(() -> new IllegalArgumentException("해당 공고가 존재하지 않습니다."));
		List<Tag> tags = recruit.getRecruitTags().getTags();
		return RecruitResponse.of(recruit, TagResponses.mappedByType(tags));
	}

	public List<RecruitResponse> readAll() {
		return recruitRepository.findAllDesc().stream()
			.map(RecruitResponse::new)
			.collect(Collectors.toList());
	}

	private void createRecruitTags(Recruit recruit, List<Tag> tags) {
		tags.forEach(tag -> RecruitTag.createRecruitTag(recruit, tag));
	}

	private List<Tag> getTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}

	public Page<RecruitResponse> readByPage(Pageable pageable) {
		Page<Recruit> page = recruitRepository.findAll(pageable);
		int totalElements = (int) page.getTotalElements();
		return new PageImpl<>(page.stream()
			.map(recruit -> RecruitResponse
				.of(recruit, TagResponses.mappedByType(recruit.getRecruitTags().getTags())))
			.collect(Collectors.toList()), pageable, totalElements);
	}
}
