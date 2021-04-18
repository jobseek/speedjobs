package com.jobseek.speedjobs.dto.post;

import javax.validation.constraints.NotBlank;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentRequest {

	@NotBlank
	private String content;

	public Comment of(User user, Post post) {
		return Comment.builder()
			.user(user)
			.post(post)
			.content(content)
			.build();
	}
}
