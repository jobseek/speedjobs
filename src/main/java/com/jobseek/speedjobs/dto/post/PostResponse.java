package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostResponse {

	private Long id;
	private Long author_id;
	private String title;
	private String content;
	private String author;
	private int viewCount;
	private int favoriteCount;
	private boolean favorite;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private Map<Type, List<TagMap>> tags;

	@Builder
	public PostResponse(Long id, Long author_id, String title, String content, String author,
		int viewCount, int favoriteCount, boolean favorite, LocalDateTime createdDate,
		LocalDateTime modifiedDate,
		Map<Type, List<TagMap>> tags) {
		this.id = id;
		this.author_id = author_id;
		this.title = title;
		this.content = content;
		this.author = author;
		this.viewCount = viewCount;
		this.favoriteCount = favoriteCount;
		this.favorite = favorite;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.tags = tags;
	}

	public static PostResponse of(Post post) {
		return PostResponse.builder()
			.id(post.getId())
			.title(post.getTitle())
			.content(post.getPostDetail().getContent())
			.author(post.getUser().getName())
			.createdDate(post.getCreatedDate())
			.modifiedDate(post.getModifiedDate())
			.viewCount(post.getViewCount())
			.tags(TagMap.toMap(post.getPostTags().getTags()))
			.build();
	}
}
