package com.jobseek.speedjobs.common.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2RegistrationException extends AuthenticationException {

	private static final String MESSAGE = "해당 소셜 로그인은 현재 지원하지 않습니다.";

	public OAuth2RegistrationException() {
		super(MESSAGE);
	}
}
