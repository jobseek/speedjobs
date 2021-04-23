package com.jobseek.speedjobs.dto.tag;

import com.jobseek.speedjobs.domain.tag.Type;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class TagUpdateRequest {

	@NotNull
	private Type type;

	@NotBlank
	private String name;

}
