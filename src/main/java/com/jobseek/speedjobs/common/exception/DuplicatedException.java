package com.jobseek.speedjobs.common.exception;

public class DuplicatedException extends RuntimeException {

	public DuplicatedException(String target, String data) {
		super(target + ", 이미 존재하는 " + data + "입니다.");
	}
}
