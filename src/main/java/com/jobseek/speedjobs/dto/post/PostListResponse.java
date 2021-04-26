package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostListResponse {

	private Long id;
	private Long authorId;
	private String title;
	private String author;
	private int commentCount;
	private int viewCount;
	private int favoriteCount;
	private boolean favorite;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private Map<Type, List<TagMap>> tags;

	public static PostListResponse of(Post post, User user) {
		User author = post.getUser();
		return PostListResponse.builder()
			.id(post.getId())
			.authorId(author.getId())
			.title(post.getTitle())
			.author(author.getNickname())
			.commentCount(post.getCommentCount())
			.viewCount(post.getViewCount())
			.favoriteCount(post.getFavoriteCount())
			.favorite(post.favoriteOf(user))
			.createdDate(post.getCreatedDate())
			.modifiedDate(post.getModifiedDate())
			.tags(TagMap.toMap(post.getTags()))
			.build();
	}
}
