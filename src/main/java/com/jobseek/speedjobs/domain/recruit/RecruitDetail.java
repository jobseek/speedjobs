package com.jobseek.speedjobs.domain.recruit;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.Enumerated;

import static lombok.AccessLevel.*;

@Embeddable @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
public class RecruitDetail {

	@Enumerated
	private Experience experience;

	@Enumerated
	private Position position;

	private String content;

}
