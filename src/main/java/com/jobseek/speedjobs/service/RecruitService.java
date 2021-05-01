package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_ADMIN;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.config.auth.LoginUserArgumentResolver;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitListResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
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
		Company company = companyRepository.findById(user.getId())
			.orElseThrow(() -> new NotFoundException("존재하지 않는 기업회원입니다."));
		Recruit recruit = recruitRequest.toEntity(company);
		List<Tag> tags = findTagsById(recruitRequest.getTagIds());
		recruit.addTags(tags);
		return recruitRepository.save(recruit).getId();
	}

	@Transactional
	public void update(Long recruitId, User user, RecruitRequest recruitRequest) {
		Recruit recruit = findOne(recruitId);
		Company company = recruit.getCompany();
		if (company != user) {
			throw new UnAuthorizedException("권한이 없습니다.");
		}
		List<Tag> tags = findTagsById(recruitRequest.getTagIds());
		recruit.update(recruitRequest.toEntity(company), tags);
	}


	@Transactional
	public void delete(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		if (user.getRole() != ROLE_ADMIN && recruit.getCompany().getId() != user.getId()) {
			throw new UnAuthorizedException("권한이 없습니다.");
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

	public Page<RecruitResponse> findAll(RecruitSearchCondition condition, Pageable pageable,
		User user) {
		return recruitQueryRepository.findAll(condition, pageable)
			.map(recruit -> RecruitResponse.of(recruit, user));
	}

	@Transactional
	@Scheduled(cron = "0 0 * * * *")
	public void changeStatusOfFinishedRecruit() {
		List<Recruit> recruits = recruitRepository
			.findAllByStatusAndCloseDateBefore(Status.PROCESS, LocalDateTime.now());
		recruits.forEach(Recruit::changeStatus);
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
				.orElseThrow(() -> new NotFoundException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}

	private Recruit findOne(Long recruitId) {
		return recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("해당 공고가 존재하지 않습니다."));
	}
}
