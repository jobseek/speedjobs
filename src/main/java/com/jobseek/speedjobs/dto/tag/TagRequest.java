package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class TagRequest {

	@NotBlank
	private String tagName;

	@NotNull
	private Type tagType;

	public Tag toEntity() {
		return Tag.builder()
			.name(tagName)
			.type(tagType)
			.build();
	}
}
