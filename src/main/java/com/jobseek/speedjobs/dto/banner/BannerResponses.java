package com.jobseek.speedjobs.dto.banner;

import com.jobseek.speedjobs.domain.banner.Banner;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BannerResponses {

	private int count;
	private List<BannerResponse> banners;

	public static BannerResponses of(List<Banner> banners) {
		List<BannerResponse> collect = banners
			.stream()
			.map(BannerResponse::of)
			.collect(Collectors.toList());
		return new BannerResponses(banners.size(), collect);
	}
}
