package com.jobseek.speedjobs.common.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnMatchedException extends RuntimeException{

	private Object data;

	public UnMatchedException(String source) {
		super(source + "이(가) 맞지 않습니다. ");
	}
}
