package com.jobseek.speedjobs.dto.user;

import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.UserDto;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserSaveRequest {

	@NotBlank(groups = UserValidateGroup.member.class)
	@Size(min = 2, max = 15)
	private String name;

	@NotBlank(groups = UserValidateGroup.member.class)
	@Size(min = 2, max = 15)
	private String nickname;

	@Size(max = 40)
	@Email(groups = UserValidateGroup.member.class)
	private String email;

	@NotBlank(groups = UserValidateGroup.member.class)
	@Size(min = 8, max = 20)
	private String password;

	@NotNull(groups = UserValidateGroup.member.class)
	private Role role;

	@NotBlank(groups = UserValidateGroup.company.class)
	@Size(max = 13)
	private String contact;

	@NotBlank(groups = UserValidateGroup.company.class)
	@Size(min = 2, max = 30)
	private String companyName;

	@NotBlank(groups = UserValidateGroup.company.class)
	@Size(max = 12)
	private String registrationNumber;

	@URL(groups = UserValidateGroup.company.class)
	private String homepage;

	public UserDto getUserDto(PasswordEncoder passwordEncoder) {
		return UserDto.builder()
			.name(name)
			.nickname(nickname)
			.email(email)
			.password(passwordEncoder.encode(password))
			.provider(Provider.LOCAL)
			.role(role)
			.contact(contact)
			.companyName(companyName)
			.companyDetail(CompanyDetail.from(registrationNumber, null, homepage,
				null, null, null, null))
			.build();
	}

}
