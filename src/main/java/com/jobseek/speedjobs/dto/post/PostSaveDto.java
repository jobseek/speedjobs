package com.jobseek.speedjobs.dto.post;

import java.util.Set;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class PostSaveDto {

	private String title;
	private String content;
	private Set<Long> tagIds;

	@Builder
	public PostSaveDto(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public Post toEntity() {
		Post post = new Post();
		post.setTitle(title);
		post.setPostDetail(PostDetail.from(content));
		return post;
	}

}
