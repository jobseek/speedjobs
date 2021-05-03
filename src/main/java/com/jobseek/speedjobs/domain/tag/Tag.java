package com.jobseek.speedjobs.domain.tag;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
@Entity
@EqualsAndHashCode(of = "id", callSuper = false)
@Table(name = "tags")
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tag_id")
	private Long id;

	@Column(unique = true, length = 50)
	private String name;

	@Enumerated(EnumType.STRING)
	private Type type;

	@ManyToMany(mappedBy = "tags")
	private final List<Post> posts = new ArrayList<>();

	@ManyToMany(mappedBy = "tags")
	private final List<Recruit> recruits = new ArrayList<>();

	@Builder
	public Tag(Type type, String name) {
		this.type = type;
		this.name = name;
	}

	public void changeTag(Type type, String name) {
		this.type = type;
		this.name = name;
	}
}
