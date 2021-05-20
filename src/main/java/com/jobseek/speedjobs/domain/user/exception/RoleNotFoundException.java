package com.jobseek.speedjobs.domain.user.exception;

import com.jobseek.speedjobs.common.exception.NotFoundException;

public class RoleNotFoundException extends NotFoundException {

	public RoleNotFoundException(String message) {
		super(message);
	}
}
