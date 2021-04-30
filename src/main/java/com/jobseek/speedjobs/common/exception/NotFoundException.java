package com.jobseek.speedjobs.common.exception;

public class NotFoundException extends RuntimeException {

	public NotFoundException(String target, String data) {
		super("해당 " + data +"를(을) 갖는 " + target + "은(는) 존재하지 않습니다.");
	}
}
