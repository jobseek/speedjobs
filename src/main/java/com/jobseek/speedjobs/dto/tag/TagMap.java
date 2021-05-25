package com.jobseek.speedjobs.dto.tag;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import java.util.ArrayList;
import java.util.HashMap;
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
public class TagMap {

	private Long id;
	private String name;

	public static TagMap of(Tag tag) {
		return new TagMap(tag.getId(), tag.getName());
	}

	public static Map<Type, List<TagMap>> toMap(List<Tag> tags) {
		Map<Type, List<TagMap>> result = new HashMap<>();
		tags.forEach(tag -> result.computeIfAbsent(tag.getType(), t -> new ArrayList<>())
			.add(TagMap.of(tag)));
		return result;
	}
}
