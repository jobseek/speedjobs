package com.jobseek.speedjobs.domain.resume.details;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import javax.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@ToString
@Setter
public class Certificate {

	private String certName;

	private String certNumber;

	private String institute;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime certDate;

	private int score;

	private int degree;

}
