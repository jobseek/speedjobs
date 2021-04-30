package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.advice.dto.ResultResponse;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.ErrorCode;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.NotSelfException;
import com.jobseek.speedjobs.common.exception.UnMatchedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {
	
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ResultResponse> NotFoundException(NotFoundException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NotFound.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(DuplicatedException.class)
	public ResponseEntity<ResultResponse> DuplicatedException(DuplicatedException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Duplicated.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(NotSelfException.class)
	public ResponseEntity<ResultResponse> NotSelfException(NotSelfException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.UnMatched.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(UnMatchedException.class)
	public ResponseEntity<ResultResponse> UnMatchedException(UnMatchedException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.UnMatched.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ResultResponse> NullPointerException(NullPointerException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NullValue.getCode())
			.message("인자가 비어있는건 아닌지 체크하세요.")
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}


}
