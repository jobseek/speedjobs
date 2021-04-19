package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
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
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Entity
@Table(name = "post_tags")
public class PostTag extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_tag_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;

	public static PostTag createPostTag(Post post, Tag tag) {
		PostTag postTag = new PostTag();
		postTag.setPost(post);
		postTag.setTag(tag);
		return postTag;
	}

	public void deletePostTag() {
		tag = null;
		post.getPostTags().removePostTag(this);
	}

	public void setPost(Post post) {
		this.post = post;
		post.getPostTags().addPostTag(this);
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

}
