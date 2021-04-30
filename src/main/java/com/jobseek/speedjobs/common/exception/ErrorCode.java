package com.jobseek.speedjobs.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

	// 00 => 권한 없음, 01 => 존재하지 않음, 02 => 불일치, 03 => 중 복
	// 04 => 지원 안함, 05 => 만료, 06 => NULL

	NotFound("NOT_FOUND_01", "존재하지 않음"),
	UnMatched("UN_MATCHED_02", "불일치"),
	Duplicated("DUPLICATED_03", "중 복"),
	NullValue("NULL_VALUE_04", "NULL");

	private final String code;
	private final String message;
}
