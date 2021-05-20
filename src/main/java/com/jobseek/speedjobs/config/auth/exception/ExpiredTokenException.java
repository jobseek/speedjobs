package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;

public class ExpiredTokenException extends UnauthorizedException {

	public ExpiredTokenException(String message) {
		super(message);
	}
}
