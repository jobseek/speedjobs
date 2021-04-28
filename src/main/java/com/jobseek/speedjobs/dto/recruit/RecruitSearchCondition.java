package com.jobseek.speedjobs.dto.recruit;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jobseek.speedjobs.domain.recruit.Experience;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class RecruitSearchCondition {

	private List<Long> tagIds;

	private String title;

	private String content;

	@Enumerated(EnumType.STRING)
	private Experience experience;

	private String companyName;

	private String address;

	private Integer avgSalary;

	private Double rating;

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
//	@DateTimeFormat(pattern = "yyyy-MM-dd kk:mm:ss")
	private LocalDateTime open;

	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime close;

}
