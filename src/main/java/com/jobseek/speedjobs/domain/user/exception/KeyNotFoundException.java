package com.jobseek.speedjobs.domain.user.exception;

import com.jobseek.speedjobs.common.exception.NotFoundException;

public class KeyNotFoundException extends NotFoundException {

	public KeyNotFoundException(String message) {
		super(message);
	}
}
