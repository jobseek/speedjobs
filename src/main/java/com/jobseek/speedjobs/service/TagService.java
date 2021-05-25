package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.dto.tag.TagRequest;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TagService {

	private final TagRepository tagRepository;

	@Transactional
	@CacheEvict(value = "tags", allEntries = true)
	public Long saveTag(TagRequest request) {
		return tagRepository.save(request.toEntity()).getId();
	}

	@Cacheable(value = "tags")
	public TagResponses findTagsByType() {
		List<Tag> tags = tagRepository.findAll();
		return TagResponses.mappedByType(tags);
	}

	@Transactional
	@CacheEvict(value = "tags", allEntries = true)
	public void deleteTag(Long tagId) {
		Tag tag = findOne(tagId);
		tag.getPosts().forEach(post -> post.getTags().remove(tag));
		tag.getRecruits().forEach(recruit -> recruit.getTags().remove(tag));
		tagRepository.delete(tag);
	}

	@Transactional
	@CacheEvict(value = "tags", allEntries = true)
	public void updateTag(Long tagId, TagRequest request) {
		Tag tag = findOne(tagId);
		tag.changeTag(request.getTagType(), request.getTagName());
	}

	public Tag findOne(Long tagId) {
		return tagRepository.findById(tagId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 태그입니다."));
	}

	public List<Tag> findTagsById(List<Long> tagIds) {
		return tagIds.stream()
			.map(this::findOne)
			.collect(Collectors.toList());
	}
}
