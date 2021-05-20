package com.jobseek.speedjobs.domain.user;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.member.Member;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

	private String name;
	private String nickname;
	private String email;
	private String password;
	private String picture;
	private String contact;
	private Role role;

	private String gender;
	private LocalDate birth;
	private String bio;
	private String oauthId;
	private Provider provider;

	private String companyName;
	private String logoImage;
	private int scale;
	private CompanyDetail companyDetail;

	public Member createMember() {
		return new Member(name, nickname, email, password, picture, contact, role, gender, birth,
			bio, oauthId, provider);
	}

	public Company createGuest() {
		return new Company(name, nickname, email, password, picture, contact, role, companyName,
			logoImage, scale, companyDetail);
	}
}
