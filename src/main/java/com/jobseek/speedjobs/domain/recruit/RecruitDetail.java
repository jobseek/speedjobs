package com.jobseek.speedjobs.domain.recruit;

import static lombok.AccessLevel.PROTECTED;

import javax.persistence.Embeddable;
import javax.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class RecruitDetail {

	@Enumerated
	private Experience experience;

	@Enumerated
	private Position position;

	private String content;

	@Builder
	public RecruitDetail(Experience experience, Position position, String content) {
		this.experience = experience;
		this.position = position;
		this.content = content;
	}

	RecruitDetail from(Experience experience, Position position, String content) {
		return RecruitDetail.builder()
			.experience(experience)
			.position(position)
			.content(content)
			.build();
	}

}
