package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_ADMIN;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitListResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
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
	private final RecruitQueryRepository recruitQueryRepository;

	@Transactional
	public Long save(RecruitRequest recruitRequest, User user) {
		Recruit recruit = recruitRequest.toEntity();
		Company company = companyRepository.findById(user.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기업회원입니다."));
		recruit.setCompany(company);
		List<Tag> tags = findTagsById(recruitRequest.getTagIds());
		recruit.addTags(tags);
		return recruitRepository.save(recruit).getId();
	}

	@Transactional
	public void update(Long recruitId, User user, RecruitRequest recruitRequest) {
		Recruit recruit = findOne(recruitId);
		if (!recruit.getCompany().getId().equals(user.getId())) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		List<Tag> tags = findTagsById(recruitRequest.getTagIds());
		recruit.update(recruitRequest.toEntity(), tags);
	}


	@Transactional
	public void delete(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		if (user.getRole() != ROLE_ADMIN && recruit.getCompany().getId() != user.getId()) {
			throw new UnauthorizedException("권한이 없습니다.");
		}
		recruitRepository.delete(recruit);
	}

	@Transactional
	public RecruitResponse findById(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		if (user != recruit.getCompany()) {
			recruit.increaseViewCount();
		}
		return RecruitResponse.of(recruit, user);
	}

	public Page<RecruitResponse> findByPage(Pageable pageable, User user) {
		Page<Recruit> page = recruitRepository.findAll(pageable);
		return new PageImpl<>(page.stream()
			.map(recruit -> RecruitResponse.of(recruit, user))
			.collect(Collectors.toList()), pageable, page.getTotalElements());
	}

	public Page<RecruitResponse> findAll(RecruitSearchCondition condition, Pageable pageable, User user) {
		return recruitQueryRepository.findAll(condition, pageable)
			.map(recruit -> RecruitResponse.of(recruit, user));
	}

	/**
	 * 찜하기
	 */
	@Transactional
	public void saveRecruitFavorite(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		recruit.addFavorite(user);
	}

	@Transactional
	public void deleteRecruitFavorite(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		recruit.removeFavorite(user);
	}

	public Page<RecruitListResponse> findRecruitFavorites(Pageable pageable, User user) {
		List<Recruit> recruits = user.getRecruitFavorites();
		return new PageImpl<>(recruits.stream()
			.map(recruit -> RecruitListResponse.of(recruit, user))
			.collect(Collectors.toList()), pageable, recruits.size());
	}

	private List<Tag> findTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}

	private Recruit findOne(Long recruitId) {
		return recruitRepository.findById(recruitId)
			.orElseThrow(() -> new IllegalArgumentException("해당 공고가 존재하지 않습니다."));
	}
}
