package com.jobseek.speedjobs.domain.user;

import java.util.Arrays;

public enum Provider {
	LOCAL, GOOGLE, GITHUB, NAVER, KAKAO;

	public static boolean contains(Provider provider) {
		return Arrays.stream(Provider.values())
			.anyMatch(p -> p.name().equals(provider.name()));
	}
}
