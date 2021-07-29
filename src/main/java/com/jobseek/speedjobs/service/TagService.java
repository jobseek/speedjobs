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
	public Long save(TagRequest request) {
		return tagRepository.save(request.toEntity()).getId();
	}

	@Cacheable(value = "tags")
	public TagResponses findAll() {
		List<Tag> tags = tagRepository.findAll();
		return TagResponses.mappedByType(tags);
	}

	@Transactional
	@CacheEvict(value = "tags", allEntries = true)
	public void delete(Long tagId) {
		Tag tag = getTag(tagId);
		tag.getPosts().forEach(post -> post.getTags().remove(tag));
		tag.getRecruits().forEach(recruit -> recruit.getTags().remove(tag));
		tagRepository.delete(tag);
	}

	@Transactional
	@CacheEvict(value = "tags", allEntries = true)
	public Tag update(Long tagId, TagRequest request) {
		Tag tag = getTag(tagId);
		tag.changeTag(request.getTagType(), request.getTagName());
		return tag;
	}

	public List<Tag> getTagsByIds(List<Long> tagIds) {
		return tagIds.stream()
			.map(this::getTag)
			.collect(Collectors.toList());
	}

	private Tag getTag(Long tagId) {
		return tagRepository.findById(tagId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 태그입니다."));
	}
}
