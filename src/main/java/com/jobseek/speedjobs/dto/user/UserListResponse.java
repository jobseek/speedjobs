package com.jobseek.speedjobs.dto.user;

import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserListResponse {

	private Long id;
	private String name;
	private String nickname;
	private String email;
	private Role role;
	private LocalDateTime createdDate;

	public static UserListResponse of(User user) {
		return UserListResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.nickname(user.getNickname())
			.email(user.getEmail())
			.role(user.getRole())
			.createdDate(user.getCreatedDate())
			.build();
	}
}
