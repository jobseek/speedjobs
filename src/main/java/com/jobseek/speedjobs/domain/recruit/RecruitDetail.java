package com.jobseek.speedjobs.domain.recruit;

import lombok.Getter;

import javax.persistence.Embeddable;
import javax.persistence.Enumerated;

@Embeddable
@Getter
public class RecruitDetail {

	@Enumerated
	private Experience experience;

	@Enumerated
	private Position position;

	private String content;

}
