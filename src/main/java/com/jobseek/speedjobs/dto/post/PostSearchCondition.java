package com.jobseek.speedjobs.dto.post;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostSearchCondition {

	private List<Long> tagIds;

	private String author;

	private String title;

	private String content;

}
