package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.UnAuthorizedException;

public class InvalidTokenException extends UnAuthorizedException {

	public InvalidTokenException(String message) {
		super(message);
	}
}
