package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import lombok.Getter;

@Getter
public class PostResponseDto {

	private Long id;
	private String title;
	private String content;

	public PostResponseDto(Post entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent();
	}
}
