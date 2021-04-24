package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.dto.banner.BannerResponse;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BannerServiceTest {

	@Autowired
	private BannerService bannerService;

	private Long id;

	@BeforeEach
	@DisplayName("배너 테스트정보 입력")
	void setUp() {
		File file = File.builder().baseName("img").extension("png").url("https://abcd.com").build();

		ArrayList<File> files = new ArrayList<File>();
		files.add(file);

		BannerResponses bannerResponses = bannerService.save(files);
		List<BannerResponse> res = bannerResponses.getBanners();
		id = res.get(0).getId();
	}

	@AfterEach
	@DisplayName("배너 테스트정보 삭제")
	void After() {
		bannerService.delete(id);
	}

	@Test
	@DisplayName("배너 이미지 가져오기")
	void readTest() {
		BannerResponses responses = bannerService.read();
		List<BannerResponse> result = responses.getBanners();
		int length = responses.getCount();
		Long tmp = result.get(length - 1).getId();

		Assertions.assertThat(tmp).isEqualTo(id);
	}
}
