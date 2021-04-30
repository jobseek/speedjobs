package com.jobseek.speedjobs.dto.user;

import com.jobseek.speedjobs.domain.user.Role;
import lombok.Data;

@Data
public class UserSearchCondition {

	private String name;

	private String nickname;

	private String email;

	private Role role;

}
