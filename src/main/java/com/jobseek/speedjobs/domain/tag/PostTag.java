package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.jobseek.speedjobs.domain.post.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Entity
@Table(name = "post_tags")
public class PostTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_tag_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "tag_id")
	private Tag tag;

	@Builder
	public PostTag(Post post, Tag tag) {
		this.post = post;
		this.tag = tag;
	}

	public static PostTag createPostTag(Post post, Tag tag) {
		PostTag postTag = new PostTag(post, tag);
		post.getPostTags().add(postTag);
		tag.getPostTags().add(postTag);
		return postTag;
	}

	public void removePostTagFromTag() {
		tag.getPostTags().remove(this);
	}

	public void removePostTagFromPost() {
		post.getPostTags().remove(this);
	}

}
