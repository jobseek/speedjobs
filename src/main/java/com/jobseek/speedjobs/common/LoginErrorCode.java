package com.jobseek.speedjobs.common;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public enum LoginErrorCode {

	DuplicatedIdFound("DUPLICATED_ID_1000", "중복된 아이디입니다."),
	UnrecognizedRole("6010", "Unrecognized Role");

	private final String code;
	private final String message;
}
