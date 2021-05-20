package com.jobseek.speedjobs.domain.recruit;

public enum Status {
	PROCESS("채용중"),
	END("마감"),
	EARLY("조기마감"),
	REGULAR("상시채용");

	private final String name;

	Status(String name) {
		this.name = name;
	}
}
