package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TagResponses implements Serializable {

	private Map<Type, List<TagResponse>> tags = new HashMap<>();

	public static TagResponses mappedByType(List<Tag> tags) {
		Map<Type, List<TagResponse>> result = new HashMap<>();
		for (Tag tag : tags) {
			result.computeIfAbsent(tag.getType(), t -> new ArrayList<>()).add(TagResponse.of(tag));
		}
		return new TagResponses(result);
	}

	public void addTags(Type type, List<Tag> tags) {
		List<TagResponse> result = tags.stream()
			.map(TagResponse::of)
			.collect(Collectors.toList());
		this.tags.put(type, result);
	}

	@Getter
	private static class TagResponse implements Serializable {

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
