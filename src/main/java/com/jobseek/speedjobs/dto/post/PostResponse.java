package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class PostResponse {

	private Long id;
	private Long authorId;
	private String title;
	private String content;
	private String author;
	private int viewCount;
	private int favoriteCount;
	private boolean favorite;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private Map<Type, List<TagMap>> tags;

	public static PostResponse of(Post post, User user) {
		User author = post.getUser();
		return PostResponse.builder()
			.id(post.getId())
			.authorId(author.getId())
			.title(post.getTitle())
			.content(post.getPostDetail().getContent())
			.author(author.getNickname())
			.viewCount(post.getViewCount())
			.favoriteCount(post.getFavoriteCount())
			.favorite(post.favoriteOf(user))
			.createdDate(post.getCreatedDate())
			.modifiedDate(post.getModifiedDate())
			.tags(TagMap.toMap(post.getTags()))
			.build();
	}
}
