package com.jobseek.speedjobs.dto.recruit;

import com.jobseek.speedjobs.domain.recruit.Experience;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagMap;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
	private Map<Type, List<TagMap>> tags;

	public RecruitResponse(Recruit recruit) {
		this.id = recruit.getId();
		this.title = recruit.getTitle();
		this.openDate = recruit.getOpenDate();
		this.closeDate = recruit.getCloseDate();
		this.status = recruit.getStatus();
		this.thumbnail = recruit.getThumbnail();
		this.experience = recruit.getRecruitDetail().getExperience();
		this.position = recruit.getRecruitDetail().getPosition();
		this.content = recruit.getRecruitDetail().getContent();
		this.tags = TagMap.toMap(recruit.getRecruitTags().getTags());
	}

	@Builder
	public RecruitResponse(Long id, String title, LocalDateTime openDate, LocalDateTime closeDate,
		Status status, String thumbnail, Experience experience,
		Position position, String content, Map<Type, List<TagMap>> tags) {
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
			.tags(TagMap.toMap(recruit.getRecruitTags().getTags()))
			.build();
	}
}
