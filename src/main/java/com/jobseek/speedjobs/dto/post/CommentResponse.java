package com.jobseek.speedjobs.dto.post;

import java.time.LocalDateTime;

import com.jobseek.speedjobs.domain.post.Comment;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CommentResponse {

	private Long id;
	private String content;
	private LocalDateTime createdDate;
	private String author;

	@Builder
	public CommentResponse(Long id, String content, LocalDateTime createdDate, String author) {
		this.id = id;
		this.content = content;
		this.author = author;
		this.createdDate = createdDate;
	}

}
