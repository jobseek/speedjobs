package com.jobseek.speedjobs.common;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResultResponse {

	@ApiModelProperty(value = "응답 성공여부")
	private Boolean success;

	@ApiModelProperty(value = "HTTP 상태 코드")
	private Integer status;

	@ApiModelProperty(value = "응답 메시지")
	private String message;

	@ApiModelProperty(value = "전송 데이터")
	private Object data;
}
