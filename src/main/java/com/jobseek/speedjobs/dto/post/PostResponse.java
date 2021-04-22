package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PostResponse {

	private Long id;
	private String title;
	private String content;
	private String author;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private int commentCount;
	private int likeCount;
	private int viewCount;
	private Map<Type, List<TagMap>> tags;
	private List<CommentResponse> comments;

	@Builder
	public PostResponse(Long id, String title, String content, String author,
		LocalDateTime createdDate, LocalDateTime modifiedDate, int commentCount, int likeCount,
		int viewCount,
		Map<Type, List<TagMap>> tags, List<CommentResponse> comments) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.author = author;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.commentCount = commentCount;
		this.likeCount = likeCount;
		this.viewCount = viewCount;
		this.tags = tags;
		this.comments = comments;
	}

	public static PostResponse of(Post post) {
		return PostResponse.builder()
			.id(post.getId())
			.title(post.getTitle())
			.content(post.getPostDetail().getContent())
			.author(post.getUser().getName())
			.createdDate(post.getCreatedDate())
			.modifiedDate(post.getModifiedDate())
			.commentCount(post.getComments().size())
			.likeCount(post.getLikeCount())
			.viewCount(post.getViewCount())
			.tags(TagMap.toMap(post.getPostTags().getTags()))
			.comments(post.getComments().stream().map(CommentResponse::of).collect(Collectors.toList()))
			.build();
	}
}
