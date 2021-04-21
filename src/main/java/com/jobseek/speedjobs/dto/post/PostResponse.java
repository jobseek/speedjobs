package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.util.List;

import com.jobseek.speedjobs.domain.post.Post;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PostResponse {

	private Long id;
	private String title;
	private String content;
	private List<Tag> tagList;
	private List<Comment> commentList;
	private TagResponses tags;
	private CommentResponse comments;

	public PostResponse(Post post) {
		this.id = post.getId();
		this.title = post.getTitle();
		this.content = post.getPostDetail().getContent();
		this.tagList = post.getPostTags().getTags();
	}

	@Builder
	public PostResponse(Long id, String title, String content,
		TagResponses tags, CommentResponse comments) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.tags = tags;
		this.comments = comments;
	}

	public static PostResponse of(Post post, TagResponses tagResponses) {
		return PostResponse.builder()
			.id(post.getId())
			.title(post.getTitle())
			.content(post.getPostDetail().getContent())
			.tags(tagResponses)
			.build();
	}


}
