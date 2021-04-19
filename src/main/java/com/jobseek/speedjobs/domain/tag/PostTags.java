package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Embeddable
public class PostTags {

	@OneToMany(mappedBy = "post", cascade = PERSIST, orphanRemoval = true, fetch = EAGER)
	List<PostTag> postTags = new ArrayList<>();

	public static PostTags empty() {
		return new PostTags();
	}

	public List<Tag> getTags() {
		return postTags.stream()
			.map(PostTag::getTag)
			.collect(Collectors.toList());
	}

	public void addPostTag(PostTag postTag) {
		postTags.add(postTag);
	}

	public void removePostTag(PostTag postTag) {
		postTags.remove(postTag);
	}

	public void clear() {
		postTags.clear();
	}

	public boolean containTagIds(List<Long> tagIds) {
		return tagIds.stream()
			.allMatch(this::containTagId);
	}

	private boolean containTagId(Long tagId) {
		return postTags.stream()
			.map(postTag -> postTag.getTag().getId())
			.anyMatch(id -> id.equals(tagId));
	}
}
