package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class CommentResponse {

	private Long id;
	private Long authorId;
	private String author;
	private String picture;
	private String content;
	private int favoriteCount;
	private boolean favorite;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

	public static CommentResponse of(Comment comment, User user) {
		User author = comment.getUser();
		return CommentResponse.builder()
			.id(comment.getId())
			.authorId(author.getId())
			.author(author.getNickname())
			.picture(author.getPicture())
			.content(comment.getContent())
			.favoriteCount(comment.getFavoriteCount())
			.favorite(comment.favoriteOf(user))
			.createdDate(comment.getCreatedDate())
			.modifiedDate(comment.getModifiedDate())
			.build();
	}

}
