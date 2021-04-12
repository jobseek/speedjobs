package com.jobseek.speedjobs.dto.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.Provider;
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
public class UserSaveRequest {

	@NotBlank
	@Size(min = 2, max = 10)
	private String name;

	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 6, max = 20)
	private String password;

	@NotNull
	private Role role;

	private String contact;

	private String companyName;

	private String registrationNumber;

	private String homepage;

	public User toEntity(PasswordEncoder passwordEncoder) {
		User user = User.builder()
			.name(name)
			.email(email)
			.password(passwordEncoder.encode(password))
			.contact(contact)
			.provider(Provider.LOCAL)
			.role(role)
			.build();

		if (role == Role.ROLE_MEMBER) {
			user.setMember(createMember());
		} else if (role == Role.ROLE_COMPANY) {
			user.setCompany(createCompany());
		}

		return user;
	}

	private Member createMember() {
		return Member.builder().build();
	}

	private Company createCompany() {
		return Company.builder()
			.companyName(companyName)
			.companyDetail(CompanyDetail.from(registrationNumber, null, homepage))
			.build();
	}
}
