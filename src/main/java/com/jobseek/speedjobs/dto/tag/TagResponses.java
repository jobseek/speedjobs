package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Builder;

public class TagResponses {

	Map<String, List<TagResponse>> tags;

	static class TagResponse {

		private Long id;
		private String name;

		private TagResponse(Long id, String name) {
			this.id = id;
			this.name = name;
		}

		public static TagResponse of(Tag tag) {
			return new TagResponse(tag.getId(), tag.getName());
		}
	}

	public void addTags(Type type, List<Tag> tags) {
		List<TagResponse> result = tags.stream()
			.map(TagResponse::of)
			.collect(Collectors.toList());
		this.tags.put(type.toString(), result);
	}

}
