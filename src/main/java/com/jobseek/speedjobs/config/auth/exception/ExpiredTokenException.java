package com.jobseek.speedjobs.config.auth.exception;

import com.jobseek.speedjobs.common.exception.UnAuthorizedException;

public class ExpiredTokenException extends UnAuthorizedException {

	public ExpiredTokenException(String message) {
		super(message);
	}
}
