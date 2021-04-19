package com.jobseek.speedjobs.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.jobseek.speedjobs.dto.tag.TagSaveRequest;
import com.jobseek.speedjobs.dto.tag.TagUpdateRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TagService {

	private final TagRepository tagRepository;

	@Transactional
	public Tag save(TagSaveRequest request) {
		return tagRepository.save(request.toEntity());
	}

	public TagResponses readByTagType() {
		TagResponses tagResponses = new TagResponses();
		Arrays.stream(Type.values())
			.forEach(type -> tagResponses.addTags(type, tagRepository.findAllByType(type)));
		return tagResponses;
	}

	@Transactional
	public void delete(Long id) {
//		Tag tag = tagRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
//		tag.getPostTags().forEach(PostTag::removePostTagFromPost);
//		tagRepository.delete(tag);
	}

	@Transactional
	public void update(Long id, TagUpdateRequest request) {
		Tag tag = tagRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 태그입니다."));
		tag.changeTag(request.getType(), request.getName());
	}
}
