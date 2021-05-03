package com.jobseek.speedjobs.dto.recruit;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitDetail;
import com.jobseek.speedjobs.domain.recruit.Status;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RecruitRequest {

	@NotBlank
	private String title;

	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime openDate;

	@Future
	@JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime closeDate;

	@NotNull
	private Status status;

	private String thumbnail;

	@NotNull
	private Integer experience; // 경력

	@NotNull
	private Position position; // 고용 형태

	@NotBlank
	private String content;

	private List<Long> tagIds;

	// Request에서 toEntity 메서드를 이용해서 엔티티로 반환한다.
	public Recruit toEntity(Company company) {
		return Recruit.builder()
			.company(company)
			.title(title)
			.openDate(openDate)
			.closeDate(closeDate)
			.status(status)
			.thumbnail(thumbnail)
			.experience(experience)
			.recruitDetail(RecruitDetail.from(position, content))
			.build();
	}

}
