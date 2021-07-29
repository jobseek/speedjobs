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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
	public Recruit save(RecruitRequest recruitRequest, User user) {
		Company company = userService.getCompany(user.getId());
		List<Tag> tags = tagService.getTagsByIds(recruitRequest.getTagIds());
		Recruit recruit = recruitRequest.toEntity(company);
		recruit.addTags(tags);
		return recruitRepository.save(recruit);
	}

	@Transactional
	public Recruit update(Long recruitId, User user, RecruitRequest recruitRequest) {
		Recruit recruit = getRecruit(recruitId);
		Company company = recruit.getCompany();
		company.verifyMe(user.getId());
		List<Tag> tags = tagService.getTagsByIds(recruitRequest.getTagIds());
		recruit.update(recruitRequest.toEntity(company), tags);
		return recruit;
	}


	@Transactional
	public void delete(Long recruitId, User user) {
		Recruit recruit = getRecruit(recruitId);
		Company company = recruit.getCompany();
		if (!user.isAdmin()) {
			company.verifyMe(user.getId());
		}
		recruitRepository.delete(recruit);
	}

	@Transactional
	public RecruitResponse findOne(Long recruitId, User user) {
		Recruit recruit = getRecruit(recruitId);
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
	@Scheduled(cron = "0 0 0 * * *")
	public void openScheduling() {
		List<Recruit> recruits = recruitRepository
			.findAllByStatusAndOpenDateBefore(Status.DRAFT, LocalDateTime.now().plusMinutes(30L));
		recruits.forEach(recruit -> recruit.changeStatus(Status.PROCESS));
	}

	@Transactional
	@Scheduled(cron = "0 0 0 * * *")
	public void closeScheduling() {
		List<Recruit> recruits = recruitRepository.
			findAllByStatusAndCloseDateBefore(Status.PROCESS, LocalDateTime.now().plusMinutes(30L));
		recruits.forEach(recruit -> recruit.changeStatus(Status.END));
	}

	@Transactional
	public void saveRecruitFavorite(Long recruitId, User user) {
		Recruit recruit = getRecruit(recruitId);
		recruit.addFavorite(user);
	}

	@Transactional
	public void deleteRecruitFavorite(Long recruitId, User user) {
		Recruit recruit = getRecruit(recruitId);
		recruit.removeFavorite(user);
	}

	public Page<RecruitListResponse> findRecruitFavorites(Pageable pageable, User user) {
		return recruitRepository.findAllByFavoritesContains(user, pageable)
			.map(recruit -> RecruitListResponse.of(recruit, user));
	}

	public Recruit getRecruit(Long recruitId) {
		return recruitRepository.findById(recruitId)
			.orElseThrow(() -> new NotFoundException("해당 공고가 존재하지 않습니다."));
	}
}
