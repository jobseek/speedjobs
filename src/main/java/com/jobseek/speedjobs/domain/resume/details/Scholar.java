package com.jobseek.speedjobs.domain.resume.details;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Getter;
import lombok.ToString;

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

	private LocalDate inDate; //입학날짜

	private LocalDate outDate; //졸업날짜

}
