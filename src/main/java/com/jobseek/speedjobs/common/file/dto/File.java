package com.jobseek.speedjobs.common.file.dto;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.banner.Banner;
import java.io.Serializable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class File implements Serializable {

	@NotBlank
	private String baseName;

	@NotBlank
	private String extension;

	@NotBlank
	@Pattern(regexp="^((http(s?))\\:\\/\\/)([0-9a-zA-Z\\-]+\\.)+[a-zA-Z]{2,6}(\\:[0-9]+)?(\\/\\S*)?$")
	private String url;

	public Banner toBanner() {
		return Banner.builder()
			.baseName(baseName)
			.extension(extension)
			.url(url)
			.build();
	}
}
