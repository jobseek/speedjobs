package com.jobseek.speedjobs.domain.user.exception;

import com.jobseek.speedjobs.common.exception.BadRequestException;

public class WrongPasswordException extends BadRequestException {

	public WrongPasswordException(String message) {
		super(message);
	}
}
