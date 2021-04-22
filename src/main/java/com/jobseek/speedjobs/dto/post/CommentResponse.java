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
	private String author;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private int likeCount;

	@Builder
	public CommentResponse(Long id, String author, String content, LocalDateTime createdDate,
		LocalDateTime modifiedDate, int likeCount) {
		this.id = id;
		this.author = author;
		this.content = content;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.likeCount = likeCount;
	}

	public static CommentResponse of(Comment comment) {
		return CommentResponse.builder()
			.id(comment.getId())
			.author(comment.getUser().getName())
			.content(comment.getContent())
			.createdDate(comment.getCreatedDate())
			.modifiedDate(comment.getModifiedDate())
			.likeCount(comment.getLikeCount())
			.build();
	}

}
