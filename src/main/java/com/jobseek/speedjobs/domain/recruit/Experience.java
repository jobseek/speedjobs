package com.jobseek.speedjobs.domain.recruit;

import java.util.Arrays;

public enum Experience {
	junior("신입"),
	one("1년 경력"),
	two("2년 경력"),
	three("3년 경력"),
	four("4년 경력"),
	five("5년 경력"),
	six("6년 경력"),
	seven("7년 경력"),
	eight("8년 경력"),
	nine("9년 경력");

	private final String name;

	Experience(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public boolean validate(String name) {
		return Arrays.stream(Experience.values())
			.anyMatch(experience -> experience.getName().equals(name));
	}
}
