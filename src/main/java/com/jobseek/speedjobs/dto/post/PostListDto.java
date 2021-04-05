package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class PostListDto {

	private Long id;
	private String title;

	public PostListDto(Post entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
	}
}
