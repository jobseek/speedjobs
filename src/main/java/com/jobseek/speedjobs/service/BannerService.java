package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.banner.Banner;
import com.jobseek.speedjobs.domain.banner.BannerRepository;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import com.jobseek.speedjobs.utils.S3Util;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BannerService {

	private final S3Util s3Util;
	private final BannerRepository bannerRepository;

	@Transactional
	public BannerResponses save(List<MultipartFile> files) {
		List<Banner> banners = files.stream()
			.map(file -> bannerRepository.save(Banner.builder()
				.baseName(FilenameUtils.getBaseName(file.getOriginalFilename()))
				.extension(FilenameUtils.getExtension(file.getOriginalFilename()))
				.url(s3Util.upload(file, s3Util.BANNER)).build()))
			.collect(Collectors.toList());
		return BannerResponses.of(banners);
	}

	public BannerResponses read() {
		return BannerResponses.of(new ArrayList<>(bannerRepository.findAll()));
	}

	@Transactional
	public void delete(Long id) {
		Banner banner = bannerRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 배너입니다."));
		bannerRepository.delete(banner);
	}
}
