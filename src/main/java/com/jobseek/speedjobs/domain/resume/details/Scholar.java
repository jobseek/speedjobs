package com.jobseek.speedjobs.domain.resume.details;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Embeddable
@Getter
@ToString
public class Scholar {

	@Enumerated(EnumType.STRING)
	private Education education;

	@Column(length = 70)
	private String schoolName;

	@Column(length = 50)
	private String major;

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime inDate; //입학날짜

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime outDate; //졸업날짜

}
