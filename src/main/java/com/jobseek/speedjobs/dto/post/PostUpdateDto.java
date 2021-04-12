package com.jobseek.speedjobs.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateDto {

	private String title;
	private String content;

	@Builder
	public PostUpdateDto(String title, String content) {
		this.title = title;
		this.content = content;
	}
}
