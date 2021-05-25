package com.jobseek.speedjobs.dto.banner;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.banner.Banner;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
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
