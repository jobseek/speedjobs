package com.jobseek.speedjobs.dto.recruit;

import com.jobseek.speedjobs.domain.recruit.Status;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RecruitSearchCondition {

	private Long companyId;

	private List<Long> tagIds;

	private String title;

	private String content;

	private Integer experience;

	private String companyName;

	private String address;

	private Integer avgSalary;

	private List<Status> status;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate openDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate closeDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate createdDate;

	public LocalDateTime getOpenDateTime() {
		return openDate == null ? null : openDate.atStartOfDay();
	}

	public LocalDateTime getCloseDateTime() {
		return closeDate == null ? null : closeDate.atStartOfDay().plusDays(1L).minusSeconds(1L);
	}

	public LocalDateTime getCreatedDate() {
		return createdDate == null ? null : createdDate.atStartOfDay();
	}

}
