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
		return Member.builder()
			.name(name)
			.nickname(nickname)
			.email(email)
			.password(password)
			.picture(picture)
			.contact(contact)
			.role(role)
			.gender(gender)
			.birth(birth)
			.bio(bio)
			.oauthId(oauthId)
			.provider(provider)
			.build();
	}

	public Company createGuest() {
		return Company.builder()
			.name(name)
			.nickname(nickname)
			.email(email)
			.password(password)
			.picture(picture)
			.contact(contact)
			.role(role)
			.companyName(companyName)
			.logoImage(logoImage)
			.scale(scale)
			.companyDetail(companyDetail)
			.build();
	}
}
