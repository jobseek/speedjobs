package com.jobseek.speedjobs.domain.recruit;

import java.util.Arrays;

public enum Experience {
	JUNIOR("신입"),
	ONE("1년 경력"),
	TWO("2년 경력"),
	THREE("3년 경력"),
	FOUR("4년 경력"),
	FIVE("5년 경력"),
	SIX("6년 경력"),
	SEVEN("7년 경력"),
	EIGHT("8년 경력"),
	NINE("9년 경력");

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
