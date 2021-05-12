package com.jobseek.speedjobs.common.exception;

public class UnauthorizedException extends RuntimeException {

	public UnauthorizedException(String message) {
		super("인증되지 않은 요청 : " + message);
	}
}
