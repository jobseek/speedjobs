package com.jobseek.speedjobs.dto.tag;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.Type;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
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
