package com.jobseek.speedjobs.dto.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostSearchCondition {

	private Long authorId;

	private List<Long> tagIds;

	private String author;

	private String title;

	private String content;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate createdDate;

	public LocalDateTime getCreatedDate() {
		return createdDate == null ? null : createdDate.atStartOfDay();
	}
}
