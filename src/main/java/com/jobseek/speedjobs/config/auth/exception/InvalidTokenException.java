package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;

public class InvalidTokenException extends UnauthorizedException {

	public InvalidTokenException(String message) {
		super(message);
	}
}
