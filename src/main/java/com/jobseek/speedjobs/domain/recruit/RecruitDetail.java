package com.jobseek.speedjobs.domain.recruit;

import static lombok.AccessLevel.PROTECTED;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class RecruitDetail {

	@Enumerated(EnumType.STRING)
	private Position position;

	@Lob
	private String content;

	@Builder
	public RecruitDetail(Position position, String content) {
		this.position = position;
		this.content = content;
	}

	public static RecruitDetail from(Position position, String content) {
		return RecruitDetail.builder()
			.position(position)
			.content(content)
			.build();
	}

}
