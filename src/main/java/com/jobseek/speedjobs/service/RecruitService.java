package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import com.jobseek.speedjobs.domain.tag.RecruitTag;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecruitService {
	private final RecruitRepository recruitRepository;
	private final TagRepository tagRepository;

	@Transactional
	public Long save(RecruitRequest recruitRequest, User user) {
		Recruit recruit = recruitRequest.toEntity();
		System.out.println("user = " + user);
		recruit.setCompany(user.getCompany());
		System.out.println("user.getCompany() = " + user.getCompany());
		List<Tag> tags = getTagsById(recruitRequest.getTagIds());
		createPostTags(recruit,tags);
		return recruitRepository.save(recruit).getId();
	}

	private void createPostTags(Recruit recruit, List<Tag> tags) {
		tags.forEach(tag -> RecruitTag.createRecruitTag(recruit, tag));
	}

	private List<Tag> getTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(tagId -> tagRepository.findById(tagId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다.")))
			.collect(Collectors.toList());
	}
}
