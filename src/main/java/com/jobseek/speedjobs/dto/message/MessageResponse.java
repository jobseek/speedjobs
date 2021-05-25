package com.jobseek.speedjobs.dto.message;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class MessageResponse {

	private Long id;
	private Long authorId;
	private String author;
	private String content;
	private LocalDateTime createdDate;

	public static MessageResponse from(Message message) {
		User author = message.getUser();

		return MessageResponse.builder()
			.id(message.getId())
			.authorId(author.getId())
			.author(author.getNickname())
			.content(message.getContent())
			.createdDate(message.getCreatedDate())
			.build();
	}
}
