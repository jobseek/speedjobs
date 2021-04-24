package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentRequest {

	@NotBlank
	private String content;

	public CommentRequest(String content) {
		this.content = content;
	}

	public Comment toEntity() {
		return Comment.builder().content(content).build();
	}

	public Comment of(User user, Post post) {
		return Comment.builder()
			.user(user)
			.post(post)
			.content(content)
			.build();
	}
}
