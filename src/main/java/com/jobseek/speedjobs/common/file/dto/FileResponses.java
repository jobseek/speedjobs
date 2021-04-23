package com.jobseek.speedjobs.common.file.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FileResponses {

	private int count;
	private List<File> files;

	public static FileResponses of(List<File> files) {
		return new FileResponses(files.size(), files);
	}
}
