package com.jobseek.speedjobs.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	Unauthorized("UN_AUTH", "권한 없음"),
	NotFound("NOT_FOUND", "존재하지 않음"),
	UnMatched("UN_MATCH", "불일치"),
	Duplicated("DUP", "중 복"),
	NotSupport("NOT_SUPPORT", "지원 안함"),
	InValidToken("INVALID_TOKEN", "토큰 에러"),
	ExpiredToken("EXPIRED_TOKEN", "토큰 만료"),
	Validation("INVALID_FIELD", "json 필드값 에러"),
	LoginCheck("LOGIN", "로그인 필요"),
	TypeError("PARSE", "JSON PARSE 에러(Enum 등)"),
	SQLError("SQL", "SQL 접속 에러"),
	NullValue("NULL", "NULL");

	private final String code;
	private final String message;
}
