package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.dto.tag.TagRequest;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TagService {

	private final TagRepository tagRepository;

	@Transactional
	public void saveTag(TagRequest request) {
		tagRepository.save(request.toEntity());
	}

	public TagResponses findTagsByType() {
		List<Tag> tags = tagRepository.findAll();
		return TagResponses.mappedByType(tags);
	}

	@Transactional
	public void deleteTag(Long tagId) {
		Tag tag = findOne(tagId);
		tag.getPosts().forEach(post -> post.getTags().remove(tag));
		tag.getRecruits().forEach(recruit -> recruit.getTags().remove(tag));
		tagRepository.deleteById(tagId);
	}

	@Transactional
	public void updateTag(Long tagId, TagRequest request) {
		Tag tag = findOne(tagId);
		tag.changeTag(request.getTagType(), request.getTagName());
	}

	private Tag findOne(Long tagId) {
		return tagRepository.findById(tagId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
	}
}
