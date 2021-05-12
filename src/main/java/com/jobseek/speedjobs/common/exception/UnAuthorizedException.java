package com.jobseek.speedjobs.common.exception;

public class UnAuthorizedException extends RuntimeException {

	public UnAuthorizedException(String message) {
		super("인증되지 않은 요청 : " + message);
	}
}
