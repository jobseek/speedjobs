package com.jobseek.speedjobs.dto.user;

import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserTokenDto {

	private Long id;

	private Role role;

	public static UserTokenDto from(User user) {
		return UserTokenDto.builder()
			.id(user.getId())
			.role(user.getRole())
			.build();
	}
}
