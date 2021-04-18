package com.jobseek.speedjobs.dto.banner;

import com.jobseek.speedjobs.domain.banner.Banner;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BannerResponse {

	private Long id;
	private String baseName;
	private String extension;
	private String url;

	public static BannerResponse of(Banner banner) {
		return BannerResponse.builder()
			.id(banner.getId())
			.baseName(banner.getBaseName())
			.extension(banner.getExtension())
			.url(banner.getUrl())
			.build();
	}
}
