package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.advice.dto.ResultResponse;
import com.jobseek.speedjobs.advice.dto.ValidResponse;
import com.jobseek.speedjobs.common.ErrorCode;
import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnAuthorizedException;
import com.jobseek.speedjobs.common.exception.UnMatchedException;
import com.jobseek.speedjobs.config.auth.exception.LoginException;
import com.jobseek.speedjobs.domain.user.exception.InvalidTokenException;
import com.jobseek.speedjobs.domain.user.exception.NotFoundKeyException;
import com.jobseek.speedjobs.domain.user.exception.NotFoundOAuth2Exception;
import com.jobseek.speedjobs.domain.user.exception.NotFoundRoleException;
import com.jobseek.speedjobs.domain.user.exception.OAuth2RegistrationException;
import com.jobseek.speedjobs.domain.user.exception.SignUpRuleException;
import com.jobseek.speedjobs.domain.user.exception.WrongPasswordException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class RestExceptionHandler {

	@ExceptionHandler(UnAuthorizedException.class)
	public ResponseEntity<ResultResponse> UnAuthorizedException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Unauthorized.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler({NotFoundException.class, NotFoundOAuth2Exception.class,
		NotFoundRoleException.class, NotFoundKeyException.class})
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

	@ExceptionHandler({WrongPasswordException.class, UnMatchedException.class,
		SignUpRuleException.class})
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

	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<ResultResponse> InvalidTokenException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.InValidToken.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler(LoginException.class)
	public ResponseEntity<ResultResponse> LoginException(RuntimeException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.LoginCheck.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ResultResponse> NullPointerException(NullPointerException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.NullValue.getCode())
			.message("인자가 비어있는건 아닌지 체크하세요.")
			.build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ResultResponse> HttpMessageConversionException(HttpMessageConversionException e) {
		log.info("Server Error Msg = {}", e.getMessage());
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.TypeError.getCode())
			.message("Enum 또는 LocalDateTime 등 json 데이터 타입을 체크하세요.")
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResultResponse> ValidException(BindException e) {
		List<String> fieldNames = e.getFieldErrors().stream().map(FieldError::getField)
			.collect(Collectors.toList());
		List<String> errMegs = e.getBindingResult().getAllErrors().stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
		Map<String, String> errMsgResult = new HashMap<>();
		fieldNames.forEach(fieldName -> {
			errMsgResult.put(fieldName, errMegs.get(fieldNames.indexOf(fieldName)));
		});
		ValidResponse validResponse = ValidResponse.builder()
			.errorCount(e.getErrorCount())
			.errMsgResult(errMsgResult)
			.status(ErrorCode.Validation.getCode())
			.build();
		log.info("@Valid Error: {}", validResponse);
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.Validation.getCode())
			.message("잘못 입력된 필드값이 있습니다. 양식을 맞춰주세요.")
			.build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@ExceptionHandler(SQLException.class)
	public ResponseEntity<ResultResponse> SQLException(SQLException e) {
		ResultResponse response = ResultResponse.builder()
			.status(ErrorCode.SQLError.getCode())
			.message(e.getMessage())
			.build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

}
