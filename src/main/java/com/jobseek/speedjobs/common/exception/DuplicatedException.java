package com.jobseek.speedjobs.common.exception;

public class DuplicatedException extends RuntimeException {

	public DuplicatedException(String target, Object data) {
		super(target + "은 이미 존재하는 " + data.toString() + "입니다.");
	}
}
