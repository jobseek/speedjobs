package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.BadRequestException;

public class OAuth2RegistrationException extends BadRequestException {

	public OAuth2RegistrationException(String message) {
		super(message);
	}
}
