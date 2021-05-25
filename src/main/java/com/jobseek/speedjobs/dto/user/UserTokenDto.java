package com.jobseek.speedjobs.dto.user;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
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
