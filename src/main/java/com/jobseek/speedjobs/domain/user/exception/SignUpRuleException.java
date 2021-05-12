package com.jobseek.speedjobs.domain.user.exception;

import com.jobseek.speedjobs.common.exception.BadRequestException;

public class SignUpRuleException extends BadRequestException {

	public SignUpRuleException(String message) {
		super(message);
	}
}
