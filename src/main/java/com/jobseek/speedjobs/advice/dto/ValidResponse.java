package com.jobseek.speedjobs.advice.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class ValidResponse {

	private String status;
	private Integer count; // 에러개수
	Map<String, String> errMsgResult;

}
