package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitListResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RecruitService {

	private final RecruitRepository recruitRepository;
	private final RecruitQueryRepository recruitQueryRepository;
	private final TagService tagService;
	private final UserService userService;

	@Transactional
	public Long save(RecruitRequest recruitRequest, User user) {
		Company company = userService.findCompany(user.getId());
		List<Tag> tags = tagService.findTagsById(recruitRequest.getTagIds());
		Recruit recruit = recruitRequest.toEntity(company);
		recruit.setStatus();
		recruit.addTags(tags);
		return recruitRepository.save(recruit).getId();
	}

	@Transactional
	public void update(Long recruitId, User user, RecruitRequest recruitRequest) {
		Recruit recruit = findOne(recruitId);
		Company company = recruit.getCompany();
		company.validateMe(user.getId());
		List<Tag> tags = tagService.findTagsById(recruitRequest.getTagIds());
		recruit.update(recruitRequest.toEntity(company), tags);
	}


	@Transactional
	public void delete(Long recruitId, User user) {
		Recruit recruit = findOne(recruitId);
		Company company = recruit.getCompany();
		if (!user.isAdmin()) {
			company.validateMe(user.getId());
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

	public Page<RecruitResponse> findAll(RecruitSearchCondition condition, Pageable pageable,
		User user) {
		return recruitQueryRepository.findAll(condition, pageable)
			.map(recruit -> RecruitResponse.of(recruit, user));
	}

	@Transactional
	@Scheduled(cron = "0 0 * * * *")
	public void changeStatus() {
		List<Recruit> toBeOpenRecruits = recruitRepository
			.findAllByStatusAndOpenDateAfter(Status.STANDBY, LocalDateTime.now().minusMinutes(1L));
		toBeOpenRecruits.forEach(recruit -> recruit.changeStatus(Status.PROCESS));
		List<Recruit> toBeClosedRecruits = recruitRepository
			.findAllByStatusAndCloseDateBefore(Status.PROCESS, LocalDateTime.now().plusMinutes(1L));
		toBeClosedRecruits.forEach(recruit -> recruit.changeStatus(Status.END));
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

	public Recruit findOne(Long recruitId) {
		return recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("해당 공고가 존재하지 않습니다."));
	}
}
