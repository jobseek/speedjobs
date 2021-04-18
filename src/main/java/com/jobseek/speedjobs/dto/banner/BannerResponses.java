package com.jobseek.speedjobs.dto.banner;

import com.jobseek.speedjobs.domain.banner.Banner;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data
public class BannerResponses {

	private int count;
	private List<BannerResponse> data;

	public static BannerResponses of(List<Banner> banners) {
		List<BannerResponse> response = banners
			.stream()
			.map(BannerResponse::of)
			.collect(Collectors.toList());
		return new BannerResponses(banners.size(), response);
	}
}
