package com.jobseek.speedjobs.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@JsonInclude(Include.NON_NULL)
public class UserListResponse {

	// 유저
	private Long id;
	private String name;
	private String nickname;
	private String email;
	private LocalDateTime createdDate;
	private String contact;
	private Role role;
	private String picture;

	// 멤버
	private String bio;
	private LocalDate birth;
	private String gender;
	private String oauthId;
	private Provider provider;

	// 기업
	private String companyName;
	private Integer scale;
	private String address;
	private Integer avgSalary;
	private String description;
	private String homepage;
	private Double latitude;
	private Double longitude;
	private String registrationNumber;
	private String logoImage;

	public static UserListResponse of(User user, Member member) {
		return UserListResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.nickname(user.getNickname())
			.email(user.getEmail())
			.createdDate(user.getCreatedDate())
			.contact(user.getContact())
			.role(user.getRole())
			.picture(user.getPicture())
			.bio(member.getBio())
			.birth(member.getBirth())
			.gender(member.getGender())
			.oauthId(member.getOauthId())
			.provider(member.getProvider())
			.build();
	}

	public static UserListResponse of(User user, Company company) {
		return UserListResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.nickname(user.getNickname())
			.email(user.getEmail())
			.createdDate(user.getCreatedDate())
			.contact(user.getContact())
			.role(user.getRole())
			.picture(user.getPicture())
			.companyName(company.getCompanyName())
			.scale(company.getScale())
			.address(company.getCompanyDetail().getAddress())
			.avgSalary(company.getCompanyDetail().getAvgSalary())
			.description(company.getCompanyDetail().getDescription())
			.homepage(company.getCompanyDetail().getHomepage())
			.latitude(company.getCompanyDetail().getLatitude())
			.longitude(company.getCompanyDetail().getLongitude())
			.registrationNumber(company.getCompanyDetail().getRegistrationNumber())
			.logoImage(company.getLogoImage())
			.build();
	}
}
