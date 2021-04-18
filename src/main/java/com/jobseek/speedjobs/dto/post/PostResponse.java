package com.jobseek.speedjobs.dto.post;

import java.util.Set;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import lombok.Getter;

@Getter
public class PostResponse {

	private Long id;
	private String title;
	private PostDetail content;

	public PostResponse(Post entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getPostDetail();
	}
}
