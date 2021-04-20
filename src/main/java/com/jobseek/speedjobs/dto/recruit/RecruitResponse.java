package com.jobseek.speedjobs.dto.recruit;

import com.jobseek.speedjobs.domain.recruit.Experience;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class RecruitResponse {
	private Long id;
	private String title;
	private LocalDateTime openDate;
	private LocalDateTime closeDate;
	private Status status;
	private String thumbnail;
	private Experience experience;
	private Position position;
	private String content;
	private TagResponses tags;

	@Builder
	public RecruitResponse(Long id, String title, LocalDateTime openDate, LocalDateTime closeDate,
		Status status, String thumbnail, Experience experience,
		Position position, String content, TagResponses tags) {
		this.id = id;
		this.title = title;
		this.openDate = openDate;
		this.closeDate = closeDate;
		this.status = status;
		this.thumbnail = thumbnail;
		this.experience = experience;
		this.position = position;
		this.content = content;
		this.tags = tags;
	}

	public static RecruitResponse of(Recruit recruit, TagResponses tagResponses) {
		return RecruitResponse.builder()
			.id(recruit.getId())
			.title(recruit.getTitle())
			.openDate(recruit.getOpenDate())
			.closeDate(recruit.getCloseDate())
			.status(recruit.getStatus())
			.thumbnail(recruit.getThumbnail())
			.experience(recruit.getRecruitDetail().getExperience())
			.position(recruit.getRecruitDetail().getPosition())
			.content(recruit.getRecruitDetail().getContent())
			.tags(tagResponses)
			.build();
	}
}
