package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;

import com.jobseek.speedjobs.domain.post.Post;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PRIVATE)
public class PostRequest {

	@NotBlank
	private String title;
	@NotBlank
	private String content;

	private List<Long> tagIds;

	@Builder
	public PostRequest(String title, String content, List<Long> tagIds) {
		this.title = title;
		this.content = content;
		this.tagIds = tagIds;
	}

	public Post toEntity() {
		return Post.from(title, content);
	}
}
