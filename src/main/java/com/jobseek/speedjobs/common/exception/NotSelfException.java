package com.jobseek.speedjobs.common.exception;

public class NotSelfException extends RuntimeException {

	public NotSelfException(Long target, Long self) {
		super("본인이 아닙니다  " + "target Id: " + target +", self Id: " + self);
	}
}
