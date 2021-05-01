package com.jobseek.speedjobs.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	// 00 => 권한 없음, 01 => 존재하지 않음, 02 => 불일치, 03 => 중 복
	// 04 => 지원 안함, 05 => 만료, 06 => 토큰 에러, 07 => NULL

	Unauthorized("UN_AUTH_00", "권한 없음"),
	NotFound("NOT_FOUND_01", "존재하지 않음"),
	UnMatched("UN_MATCH_02", "불일치"),
	Duplicated("DUP_03", "중 복"),
	NotSupport("NOT_SUPPORT_04", "지원 안함"),
	NullValue("NULL_07", "NULL");

	private final String code;
	private final String message;
}
