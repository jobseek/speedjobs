package com.jobseek.speedjobs.domain.resume.details;

import java.time.LocalDate;
import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.ToString;

@Embeddable
@Getter
@ToString
public class Career {

	private String companyName;

	private String position;

	private LocalDate inDate; //입사날짜

	private LocalDate outDate; //퇴사날짜

}
