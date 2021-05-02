package com.jobseek.speedjobs.dto.post;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PostSearchCondition {

	private List<Long> tagIds;

	private String author;

	private String title;

	private String content;

}
