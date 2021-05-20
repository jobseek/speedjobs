package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.domain.banner.Banner;
import com.jobseek.speedjobs.domain.banner.BannerRepository;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BannerService {

	private final BannerRepository bannerRepository;

	@Transactional
	public BannerResponses save(List<File> files) {
		List<Banner> banners = files.stream()
			.map(file -> bannerRepository.save(Banner.builder()
				.baseName(file.getBaseName())
				.extension(file.getExtension())
				.url(file.getUrl())
				.build()))
			.collect(Collectors.toList());
		return BannerResponses.of(banners);
	}

	public BannerResponses find() {
		return BannerResponses.of(new ArrayList<>(bannerRepository.findAll()));
	}

	@Transactional
	public void delete(Long id) {
		Banner banner = bannerRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 배너입니다."));
		bannerRepository.delete(banner);
	}
}
