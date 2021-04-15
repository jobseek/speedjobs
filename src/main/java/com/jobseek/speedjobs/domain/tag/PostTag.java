package com.jobseek.speedjobs.domain.tag;

import com.jobseek.speedjobs.domain.post.Post;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "post_tags")
public class PostTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_tag_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "post_id")
	private Post post;

	@Id
	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "tag_id")
	private Tag tag;

	@Builder
	public PostTag(Post post, Tag tag) {
		this.post = post;
		this.tag = tag;
	}

}
