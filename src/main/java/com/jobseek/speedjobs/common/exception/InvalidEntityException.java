package com.jobseek.speedjobs.common.exception;

public class InvalidEntityException extends RuntimeException {

	private static final String MESSAGE = "유효하지 않은 엔티티입니다.";

	public InvalidEntityException() {
		super(MESSAGE);
	}
}
