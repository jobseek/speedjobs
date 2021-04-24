package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class TagMap {

	private final Long id;
	private final String name;

	private TagMap(Long id, String name) {
		this.id = id;
		this.name = name;
	}

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
