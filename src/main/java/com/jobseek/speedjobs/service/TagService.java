package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.PostTagRepository;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.jobseek.speedjobs.dto.tag.TagSaveRequest;
import com.jobseek.speedjobs.dto.tag.TagUpdateRequest;
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
	private final PostTagRepository postTagRepository;

	@Transactional
	public void saveTag(TagSaveRequest request) {
		tagRepository.save(request.toEntity());
	}

	public TagResponses findTagsByType() {
		List<Tag> tags = tagRepository.findAll();
		return TagResponses.mappedByType(tags);
	}

	@Transactional
	public void deleteTag(Long tagId) {
		List<PostTag> postTags = postTagRepository.findByTagId(tagId);
		postTags.forEach(PostTag::deletePostTag);
		tagRepository.deleteById(tagId);
	}

	@Transactional
	public void updateTag(Long tagId, TagUpdateRequest request) {
		Tag tag = tagRepository.findById(tagId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
		tag.changeTag(request.getType(), request.getName());
	}
}
