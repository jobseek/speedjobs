package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.domain.banner.Banner;
import com.jobseek.speedjobs.domain.banner.BannerRepository;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BannerServiceTest {

	private Banner banner;

	private BannerService bannerService;

	@Mock
	private BannerRepository bannerRepository;

	@BeforeEach
	void setUp() {
		bannerService = new BannerService(bannerRepository);

		banner = Banner.builder()
			.id(1L)
			.baseName("https://speedjobs.s3.ap-northeast-2.amazonaws.com/example/img1")
			.extension("jpg")
			.url("https://speedjobs.s3.ap-northeast-2.amazonaws.com/example/img1.jpg")
			.build();
	}

	@DisplayName("배너 등록")
	@Test
	void save() {
		File file = File.builder()
			.baseName(banner.getBaseName())
			.extension(banner.getExtension())
			.url(banner.getUrl())
			.build();
		given(bannerRepository.save(any(Banner.class))).willReturn(banner);

		BannerResponses responses = bannerService.save(List.of(file));

		assertEquals(1, responses.getCount());
	}

	@DisplayName("배너 전체 조회")
	@Test
	void findAll() {
		given(bannerRepository.findAll()).willReturn(List.of(banner));

		BannerResponses responses = bannerService.findAll();

		assertEquals(1, responses.getCount());
	}

	@DisplayName("배너 삭제")
	@Test
	void delete() {
		given(bannerRepository.findById(any())).willReturn(Optional.of(banner));
		doNothing().when(bannerRepository).delete(banner);

		bannerService.delete(1L);

		verify(bannerRepository, times(1)).delete(banner);
	}
}
