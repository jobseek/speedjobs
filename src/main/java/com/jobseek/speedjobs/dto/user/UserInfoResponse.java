package com.jobseek.speedjobs.dto.user;

import com.jobseek.speedjobs.domain.user.Role;
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
public class UserInfoResponse {

	private Long id;
	private String email;
	private String name;
	private String picture;
	private Role role;

	public static UserInfoResponse of(User user) {
		return UserInfoResponse.builder()
			.id(user.getId())
			.email(user.getEmail())
			.name(user.getName())
			.picture(user.getPicture())
			.role(user.getRole())
			.build();
	}

}
