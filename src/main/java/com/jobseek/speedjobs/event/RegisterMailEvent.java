package com.jobseek.speedjobs.event;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PRIVATE)
@AllArgsConstructor
public class RegisterMailEvent {

	private String key;
	private String email;
}
