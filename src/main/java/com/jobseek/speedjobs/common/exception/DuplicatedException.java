package com.jobseek.speedjobs.common.exception;

public class DuplicatedException extends RuntimeException {

	public DuplicatedException(String message) {
		super("중복된 요청 : " + message);
	}
}
