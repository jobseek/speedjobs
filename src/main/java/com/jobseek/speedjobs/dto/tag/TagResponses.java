package com.jobseek.speedjobs.dto.tag;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class TagResponses implements Serializable {

	private Map<Type, List<TagResponse>> tags;

	public static TagResponses mappedByType(List<Tag> tags) {
		Map<Type, List<TagResponse>> result = new EnumMap<>(Type.class);
		for (Tag tag : tags) {
			result.computeIfAbsent(tag.getType(), t -> new ArrayList<>()).add(TagResponse.of(tag));
		}
		return new TagResponses(result);
	}

	@Getter
	public static class TagResponse implements Serializable {

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
