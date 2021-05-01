package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.advice.dto.ResultResponse;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.ErrorCode;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.common.exception.UnMatchedException;
import com.jobseek.speedjobs.domain.user.exception.NotFoundKeyException;
import com.jobseek.speedjobs.domain.user.exception.NotFoundOAuth2Exception;
import com.jobseek.speedjobs.domain.user.exception.NotFoundRoleException;
import com.jobseek.speedjobs.domain.user.exception.OAuth2RegistrationException;
import com.jobseek.speedjobs.domain.user.exception.SignUpRuleException;
import com.jobseek.speedjobs.domain.user.exception.WrongPasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(UnAuthorizedException.class)
	public ResponseEntity<ResultResponse> UnAuthorizedException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Unauthorized.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler({NotFoundException.class, NotFoundOAuth2Exception.class, NotFoundRoleException.class, NotFoundKeyException.class})
	public ResponseEntity<ResultResponse> NotFoundException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NotFound.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(DuplicatedException.class)
	public ResponseEntity<ResultResponse> DuplicatedException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Duplicated.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
	}

	@ExceptionHandler({WrongPasswordException.class, UnMatchedException.class, SignUpRuleException.class})
	public ResponseEntity<ResultResponse> UnMatchedException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.UnMatched.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler(OAuth2RegistrationException.class)
	public ResponseEntity<ResultResponse> NotSupportException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NotSupport.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(response);
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ResultResponse> NullPointerException(NullPointerException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NullValue.getCode())
			.message("인자가 비어있는건 아닌지 체크하세요.")
			.build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}


}
