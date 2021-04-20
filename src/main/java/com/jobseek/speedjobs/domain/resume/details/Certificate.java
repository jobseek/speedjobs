package com.jobseek.speedjobs.domain.resume.details;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Embeddable
@Getter
@ToString
public class Certificate {

	private String certName;

	private String certNumber;

	private String institute;

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime certDate;

	private int score;

	private int degree;

}
