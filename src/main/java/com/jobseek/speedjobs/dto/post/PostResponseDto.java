package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import lombok.Getter;

@Getter
public class PostResponseDto {

	private Long id;
	private String title;
	private PostDetail content;

	public PostResponseDto(Post entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getPostDetail();
	}
}
