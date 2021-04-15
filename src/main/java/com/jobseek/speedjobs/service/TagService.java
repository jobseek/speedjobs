package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.jobseek.speedjobs.dto.tag.TagSaveRequest;
import java.util.Arrays;
import java.util.stream.Collectors;
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
	public Tag save(TagSaveRequest request) {
		return tagRepository.save(request.toEntity());
	}

	public TagResponses readByTagType() {
		TagResponses tagResponses = new TagResponses();
		Arrays.stream(Type.values())
			.forEach(type -> tagResponses.addTags(type, tagRepository.findAllByType(type)));
		return tagResponses;
	}
}
