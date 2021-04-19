package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.util.Set;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PostResponse {

	private Long id;
	private String title;
	private String content;
	private TagResponses tags;
	private CommentResponses comments;

	@Builder
	public PostResponse(Long id, String title, String content,
		TagResponses tags, CommentResponses comments) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.tags = tags;
		this.comments = comments;
	}

//	public PostResponse of(Post post) {
//		return PostResponse
//	}
}
