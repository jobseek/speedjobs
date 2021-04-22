package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.user.User;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PRIVATE)
public class PostRequest {

	@NotBlank
	private String title;
	@NotBlank
	private String content;

	private List<Long> tagIds;

	@Builder
	public PostRequest(String title, String content, List<Long> tagIds) {
		this.title = title;
		this.content = content;
		this.tagIds = tagIds;
	}

	public Post toEntity() {
		return Post.createPost(title, content);
	}
}
