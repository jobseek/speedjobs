package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.advice.dto.ResultResponse;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.ErrorCode;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

//	@ExceptionHandler(TestException.class)
//	public ResponseEntity<ResultResponse> testException(TestException e) {
//		ResultResponse response = ResultResponse.builder()
//			.status(ErrorCode.DuplicatedIdFound.getCode())
//			.message(LoginErrorCode.DuplicatedIdFound.getMessage())
//			.success(false)
//			.build();
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body();
//	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ResultResponse> NotFoundException(NotFoundException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NotFound.getCode())
			.message(e.getMessage())
			.success(false)
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(DuplicatedException.class)
	public ResponseEntity<ResultResponse> DuplicatedException(DuplicatedException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Duplicated.getCode())
			.message(e.getMessage())
			.success(false)
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}


}
