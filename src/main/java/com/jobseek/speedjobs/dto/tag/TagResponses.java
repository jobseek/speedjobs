package com.jobseek.speedjobs.dto.tag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;

import lombok.Getter;

@Getter
public class TagResponses {

	private final Map<Type, List<TagResponse>> tags = new HashMap<>();

	public void addTags(Type type, List<Tag> tags) {
		List<TagResponse> result = tags.stream()
			.map(TagResponse::of)
			.collect(Collectors.toList());
		this.tags.put(type, result);
	}

	@Getter
	private static class TagResponse {

		private final Long id;
		private final String name;

		private TagResponse(Long id, String name) {
			this.id = id;
			this.name = name;
		}

		private static TagResponse of(Tag tag) {
			return new TagResponse(tag.getId(), tag.getName());
		}
	}

}
