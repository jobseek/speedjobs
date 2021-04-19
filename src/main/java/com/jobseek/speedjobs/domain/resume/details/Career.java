package com.jobseek.speedjobs.domain.resume.details;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

@Embeddable
@Getter
@ToString
public class Career {

	private String companyName;

	private String position;

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime inDate; //입사날짜

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime outDate; //퇴사날짜

}
