package com.jobseek.speedjobs.domain.banner;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class BannerRepositoryTest {

	@Autowired
	BannerRepository bannerRepository;

	@Autowired
	EntityManager em;

	@Test
	@DisplayName("basic test")
	public void testBanner() {
		Banner banner = Banner.builder()
			.baseName("img")
			.extension("png")
			.url("https://www.google.com").build();
		Banner savedBanner = bannerRepository.save(banner);
		assertThat(savedBanner.getId()).isEqualTo(banner.getId());
		assertThat(savedBanner.getBaseName()).isEqualTo("img");
	}

	@Test
	@DisplayName("basic CRUD")
	public void basicCRUD() {
		Banner banner1 = Banner.builder()
			.baseName("img")
			.extension("png")
			.url("https://www.google.com").build();
		Banner banner2 = Banner.builder()
			.baseName("img")
			.extension("png")
			.url("https://www.google.com").build();
		bannerRepository.save(banner1);
		bannerRepository.save(banner2);

		// 단건 조회 검증
		Banner findBanner1 = bannerRepository.findById(banner1.getId()).orElse(null);
		Banner findBanner2 = bannerRepository.findById(banner2.getId()).orElse(null);
		assertThat(findBanner1).isEqualTo(banner1);
		assertThat(findBanner2).isEqualTo(banner2);

		// 전체 조회 검증
		List<Banner> banners = bannerRepository.findAll();
		assertThat(banners.size()).isEqualTo(2);

		// 수정 검증 (영속성으로 인해 원본 객체를 바꿔주면 영속성 context가 알아서 업데이트 시켜준다)
		banner1.changeExtension("jpg");
		assertThat(findBanner1.getExtension()).isEqualTo("jpg");

		// 삭제 검증
		bannerRepository.delete(banner2);
		assertThat(bannerRepository.findAll().size()).isEqualTo(1);
	}
}
