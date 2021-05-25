package com.jobseek.speedjobs.dto.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.post.Post;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class PostRequest {

	@NotBlank
	private String title;

	@NotBlank
	private String content;

	private List<Long> tagIds;

	public Post toEntity() {
		return Post.from(title, content);
	}
}
