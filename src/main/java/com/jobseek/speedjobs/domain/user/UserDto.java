package com.jobseek.speedjobs.domain.user;

import java.time.LocalDate;

import javax.persistence.Column;

import com.jobseek.speedjobs.domain.company.CompanyDetail;

import lombok.Data;

@Data
public class UserDto {

	private String name;
	private String email;
	private String password;
	private String picture;
	private Role role;

	private String sex;
	private LocalDate birth;
	private String nickname;
	private String bio;
	private Provider provider;
	private String oauthId;

	private String companyName;
	private String logoImage;
	private int scale;
	private CompanyDetail companyDetail;

	public User toEntity() {
		return User.builder()
			.name(name)
			.email(email)
			.password(password)
			.picture(picture)
			.role(role)
			.build();
	}
}
