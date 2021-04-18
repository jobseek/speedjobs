package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.google.common.base.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Entity
@Table(name = "tags")
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tag_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	private Type type;

	@Column(unique = true, length = 50)
	private String name;

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = ALL, orphanRemoval = true)
	private Set<PostTag> postTags = new HashSet<>();

	@OneToMany(mappedBy = "tag", fetch = LAZY, cascade = ALL)
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

	public void changeTag(Type type, String name) {
		this.type = type;
		this.name = name;
	}
}
