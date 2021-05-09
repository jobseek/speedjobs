package com.jobseek.speedjobs.dto.message;

import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MessageResponse {

	private Long id;
	private Long authorId;
	private String author;
	private String content;

	public static MessageResponse from(Message message) {
		User author = message.getUser();
		return MessageResponse.builder()
			.id(message.getId())
			.authorId(author.getId())
			.author(author.getNickname())
			.content(message.getContent())
			.build();
	}
}
