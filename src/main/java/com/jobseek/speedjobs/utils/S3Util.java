package com.jobseek.speedjobs.utils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Util {

	public final String BANNER = "banner";
	public final String ORIGIN = "origin";
	public final String THUMB = "thumb";
	private final AmazonS3Client s3Client;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String upload(MultipartFile file, String dirName) {
		String key = dirName + "/" + file.getOriginalFilename();
		try {
			s3Client.putObject(
				new PutObjectRequest(bucket, key, file.getInputStream(), null)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new IllegalArgumentException("유효하지 않은 파일입니다.");
		}
		return s3Client.getUrl(bucket, key).toString();
	}
}
