package com.jobseek.speedjobs.dto.post;

import java.time.LocalDateTime;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.PostTags;
import com.jobseek.speedjobs.dto.tag.TagResponses;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostResponses {

	private Long id;
	private String title;
	private String author;
	private TagResponses tags;
	private LocalDateTime createdDate;

	@Builder
	public PostResponses(Long id, String title, String author, TagResponses tags, LocalDateTime createdDate) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.tags = tags;
		this.createdDate = createdDate;
	}

	public static PostResponses of(Post post) {
		return PostResponses.builder()
			.id(post.getId())
			.title(post.getTitle())
			.author(post.getUser().getName())
			.tags(TagResponses.mappedByType(post.getPostTags().getTags()))
			.createdDate(post.getCreatedDate())
			.build();
	}

}
