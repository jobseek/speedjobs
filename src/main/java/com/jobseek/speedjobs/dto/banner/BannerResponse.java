package com.jobseek.speedjobs.dto.banner;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.domain.banner.Banner;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class BannerResponse {

	private Long id;
	private File file;

	public static BannerResponse of(Banner banner) {
		return BannerResponse.builder()
			.id(banner.getId())
			.file(File.builder()
				.baseName(banner.getBaseName())
				.extension(banner.getExtension())
				.url(banner.getUrl())
				.build())
			.build();
	}
}
