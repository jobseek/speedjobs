package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentResponse {

	private Long id;
	private Long authorId;
	private String author;
	private String picture;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

	@Builder
	public CommentResponse(Long id, Long authorId, String author, String picture,
		String content, LocalDateTime createdDate, LocalDateTime modifiedDate) {
		this.id = id;
		this.authorId = authorId;
		this.author = author;
		this.picture = picture;
		this.content = content;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}

	public static CommentResponse of(Comment comment) {
		User author = comment.getUser();
		return CommentResponse.builder()
			.id(comment.getId())
			.authorId(author.getId())
			.author(author.getNickname())
			.picture(author.getPicture())
			.content(comment.getContent())
			.createdDate(comment.getCreatedDate())
			.modifiedDate(comment.getModifiedDate())
			.build();
	}

}
