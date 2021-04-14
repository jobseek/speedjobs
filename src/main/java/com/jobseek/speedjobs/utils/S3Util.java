package com.jobseek.speedjobs.utils;

import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Util {

	private final AmazonS3Client s3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String upload(MultipartFile file) {
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		String key = "origin/" + UUID.randomUUID() + "." + extension;
		try {
			s3Client.putObject(
				new PutObjectRequest(bucket, key, file.getInputStream(), null)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			return s3Client.getUrl(bucket, key).toString();
		} catch (IOException e) {
			throw new IllegalArgumentException("유효하지 않은 파일입니다.");
		}
	}
}
