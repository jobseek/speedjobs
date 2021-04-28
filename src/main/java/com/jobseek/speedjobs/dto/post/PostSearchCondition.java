package com.jobseek.speedjobs.dto.post;

import java.util.List;
import lombok.Data;

@Data
public class PostSearchCondition {

	private List<Long> tagIds;

	private String author;

	private String title;

	private String content;

}
