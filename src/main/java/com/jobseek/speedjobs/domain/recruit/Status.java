package com.jobseek.speedjobs.domain.recruit;

public enum Status {
	STANDBY("채용전"),
	PROCESS("채용중"),
	END("채용마감"),
	REGULAR("상시채용");

	private final String name;

	Status(String name) {
		this.name = name;
	}
}
