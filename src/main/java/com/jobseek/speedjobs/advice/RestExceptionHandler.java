package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.common.LoginErrorCode;
import com.jobseek.speedjobs.advice.dto.ResultResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(TestException.class)
	public ResponseEntity<ResultResponse> testException(TestException e) {
		ResultResponse response = ResultResponse.builder()
			.status(LoginErrorCode.DuplicatedIdFound.getCode())
			.message(LoginErrorCode.DuplicatedIdFound.getMessage())
			.success(false)
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
}
