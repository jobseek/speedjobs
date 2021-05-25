package com.jobseek.speedjobs.dto.user;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.exception.RoleNotFoundException;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
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

	public User toEntity(PasswordEncoder passwordEncoder) {
		if (role == ROLE_MEMBER) {
			return Member.builder()
				.name(name)
				.nickname(nickname)
				.email(email)
				.password(passwordEncoder.encode(password))
				.role(role)
				.provider(Provider.LOCAL)
				.build();
		} else if (role == ROLE_GUEST) {
			return Company.builder()
				.name(name)
				.nickname(nickname)
				.email(email)
				.password(passwordEncoder.encode(password))
				.role(role)
				.contact(contact)
				.companyName(companyName)
				.companyDetail(CompanyDetail.builder()
					.registrationNumber(registrationNumber)
					.homepage(homepage)
					.build())
				.build();
		} else {
			throw new RoleNotFoundException("존재하지 않는 역할입니다.");
		}
	}
}
