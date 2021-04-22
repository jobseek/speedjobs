package com.jobseek.speedjobs.dto.post;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CommentListResponse {
	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdDate;
	private String author;

	@Builder
	public CommentListResponse(Long id, String title, String content,
		LocalDateTime createdDate, String author) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.createdDate = createdDate;
		this.author = author;
	}
}
