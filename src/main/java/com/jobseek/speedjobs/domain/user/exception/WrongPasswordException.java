package com.jobseek.speedjobs.domain.user.exception;

import com.jobseek.speedjobs.common.exception.ForbiddenException;

public class WrongPasswordException extends ForbiddenException {

	public WrongPasswordException(String message) {
		super(message);
	}
}
