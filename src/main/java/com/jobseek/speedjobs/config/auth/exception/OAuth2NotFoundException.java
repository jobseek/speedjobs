package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.NotFoundException;

public class OAuth2NotFoundException extends NotFoundException {

	public OAuth2NotFoundException(String message) {
		super(message);
	}
}
