package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
