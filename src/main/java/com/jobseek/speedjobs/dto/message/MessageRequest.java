package com.jobseek.speedjobs.dto.message;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class MessageRequest {

	private Long roomId;
	private Long authorId;
	private String content;

	public Message toEntity(User user, Recruit recruit) {
		return Message.builder()
			.content(content)
			.user(user)
			.recruit(recruit)
			.build();
	}
}
