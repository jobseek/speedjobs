package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.user.User;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class CommentRequest {

	@NotBlank
	private String content;

	public Comment toEntity(User user, Post post) {
		return Comment.builder()
			.user(user)
			.post(post)
			.content(content)
			.build();
	}
}
