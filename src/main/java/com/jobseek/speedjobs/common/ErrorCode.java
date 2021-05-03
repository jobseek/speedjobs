package com.jobseek.speedjobs.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	// 00 => 권한 없음, 01 => 존재하지 않음, 02 => 불일치, 03 => 중 복
	// 04 => 지원 안함, 05 => 토큰 에러, 06 => json Invalid 에러
	// 07 => 로그인 에러, 08 => json parse 에러(enum 타입 등)
	// 99 => null

	Unauthorized("UN_AUTH_00", "권한 없음"),
	NotFound("NOT_FOUND_01", "존재하지 않음"),
	UnMatched("UN_MATCH_02", "불일치"),
	Duplicated("DUP_03", "중 복"),
	NotSupport("NOT_SUPPORT_04", "지원 안함"),
	InValidToken("INVALID_TOKEN_05", "토큰 에러"),
	Validation("INVALID_FIELD_06", "json 필드값 에러"),
	LoginCheck("LOGIN_07", "로그인 필요"),
	TypeError("PARSE_08", "JSON PARSE 에러(Enum 등)"),
	NullValue("NULL_99", "NULL");

	private final String code;
	private final String message;
}
