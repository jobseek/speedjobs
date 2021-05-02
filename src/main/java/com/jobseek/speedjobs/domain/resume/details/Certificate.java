package com.jobseek.speedjobs.domain.resume.details;

import java.time.LocalDate;
import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@Setter
@ToString
@Setter
public class Certificate {

	private String certName;

	private String certNumber;

	private String institute;

	private LocalDate certDate;

	private int score;

	private int degree;

}
