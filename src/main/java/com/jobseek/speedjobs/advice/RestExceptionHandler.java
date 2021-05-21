package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.advice.dto.ErrorResponse;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.ForbiddenException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> NotFoundException(NotFoundException e) {
		ErrorResponse response = new ErrorResponse(e.getMessage());
		log.error("NotFoundException - {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> HttpMessageConversionException(
		HttpMessageConversionException e) {
		ErrorResponse response = new ErrorResponse("Enum 또는 LocalDateTime 등 json 데이터 타입을 체크하세요.");
		log.error("HttpMessageNotReadableException - {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> ValidException(BindException e) {
		log.error("ValidException - {}", e.getMessage());
		ErrorResponse response = new ErrorResponse("잘못 입력된 필드값이 있습니다. 양식을 맞춰주세요.");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler({UnauthorizedException.class, AccessDeniedException.class})
	public ResponseEntity<ErrorResponse> UnauthorizedException(UnauthorizedException e) {
		ErrorResponse response = new ErrorResponse(e.getMessage());
		log.error("UnauthorizedException - {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<ErrorResponse> ForbiddenException(ForbiddenException e) {
		ErrorResponse response = new ErrorResponse(e.getMessage());
		log.error("ForbiddenException - {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	}

	@ExceptionHandler(DuplicatedException.class)
	public ResponseEntity<ErrorResponse> DuplicatedException(RuntimeException e) {
		ErrorResponse response = new ErrorResponse(e.getMessage());
		log.error("DuplicatedException - {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> Exception(Exception e) {
		ErrorResponse response = new ErrorResponse(e.getMessage());
		log.error("Exception - {}", e.getMessage());
		log.error(Arrays.toString(e.getStackTrace()));
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}
}
