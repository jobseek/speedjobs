package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Embeddable
public class RecruitTags {

	@OneToMany(mappedBy = "recruit", cascade = PERSIST, orphanRemoval = true, fetch = EAGER)
	List<RecruitTag> recruitTags = new ArrayList<>();

	public static RecruitTags empty() {
		return new RecruitTags();
	}

	public List<Tag> getTags() {
		return recruitTags.stream()
			.map(RecruitTag::getTag)
			.collect(Collectors.toList());
	}

	public void addRecruitTag(RecruitTag recruitTag) {
		recruitTags.add(recruitTag);
	}

	public void removeRecruitTag(RecruitTag recruitTag) {
		recruitTags.remove(recruitTag);
	}

	public void clear() {
		recruitTags.clear();
	}

	public boolean containTagIds(List<Long> tagIds) {
		return tagIds.stream()
			.allMatch(this::containTagId);
	}

	private boolean containTagId(Long tagId) {
		return recruitTags.stream()
			.map(recruitTag -> recruitTag.getTag().getId())
			.anyMatch(id -> id.equals(tagId));
	}
}
