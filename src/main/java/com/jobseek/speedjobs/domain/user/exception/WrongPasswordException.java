package com.jobseek.speedjobs.domain.user.exception;

public class WrongPasswordException extends RuntimeException{

	public WrongPasswordException(String message) {
		super(message);
	}
}
