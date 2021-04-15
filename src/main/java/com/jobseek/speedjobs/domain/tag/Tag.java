package com.jobseek.speedjobs.domain.tag;

import lombok.*;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

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
	private String name;

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = PERSIST)
	private Set<PostTag> postTags = new HashSet<>();

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = PERSIST)
	private Set<RecruitTags> recruitTags = new HashSet<>();

	@Builder
	public Tag(Type type, String name) {
		this.type = type;
		this.name = name;
	}

	public void addPostTag(PostTag postTag) {
		postTags.add(postTag);
		postTag.setTag(this);
	}
}
