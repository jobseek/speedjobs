package com.jobseek.speedjobs.domain.tag;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Entity
@Table(name = "tags")
public class Tag {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tag_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(unique = true, length = 50)
	private String tagName;

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = ALL)
	private List<PostTag> postTags = new ArrayList<>();

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = ALL)
	private List<RecruitTags> recruitTags = new ArrayList<>();

	public void addPostTag(PostTag postTag) {
		postTag.setTag(this);
		postTags.add(postTag);
	}

	public void setPostTags(List<PostTag> postTags) {
		this.postTags = postTags;
	}

	public void setRecruitTags(List<RecruitTags> recruitTags) {
		this.recruitTags = recruitTags;
	}

	@Builder
	public Tag(Type type, String tagName) {
		this.type = type;
		this.tagName = tagName;
	}
}
