package com.jobseek.speedjobs.dto.post;

import java.util.Set;

import javax.validation.constraints.NotBlank;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostRequest {

	@NotBlank
	private String title;

	@NotBlank
	private String content;

	private Set<Long> tagIds;

	@Builder
	public PostRequest(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public Post toEntity() {
		Post post = new Post();
		post.setTitle(title);
		post.setPostDetail(PostDetail.from(content));
		return post;
	}
}
