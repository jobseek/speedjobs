package com.jobseek.speedjobs.dto.user;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserVisitor;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@JsonInclude(Include.NON_NULL)
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class UserInfoResponse {

	private String name;
	private String email;
	private String contact;
	private String picture;

	private LocalDate birth;
	private String bio;
	private String nickname;
	private String gender;

	private String companyName;
	private String logoImage;
	private Integer scale;

	private String registrationNumber;
	private String description;
	private String homepage;
	private String address;
	private String detailedAddress;
	private Integer avgSalary;
	private Double latitude;
	private Double longitude;

	public static UserInfoResponse of(User user) {
		return user.accept(new UserToUserInfoResponseVisitor());
	}

	private static class UserToUserInfoResponseVisitor implements UserVisitor<UserInfoResponse> {

		@Override
		public UserInfoResponse visitUser(User user) {
			return null;
		}

		@Override
		public UserInfoResponse visitMember(Member member) {
			return UserInfoResponse.builder()
				.name(member.getName())
				.email(member.getEmail())
				.contact(member.getContact())
				.picture(member.getPicture())
				.birth(member.getBirth())
				.bio(member.getBio())
				.nickname(member.getNickname())
				.gender(member.getGender())
				.build();
		}

		@Override
		public UserInfoResponse visitCompany(Company company) {
			CompanyDetail detail = company.getCompanyDetail();
			return UserInfoResponse.builder()
				.name(company.getName())
				.nickname(company.getNickname())
				.email(company.getEmail())
				.contact(company.getContact())
				.picture(company.getPicture())
				.companyName(company.getCompanyName())
				.logoImage(company.getLogoImage())
				.scale(company.getScale())
				.registrationNumber(detail.getRegistrationNumber())
				.description(detail.getDescription())
				.homepage(detail.getHomepage())
				.address(detail.getAddress())
				.detailedAddress(detail.getDetailedAddress())
				.avgSalary(detail.getAvgSalary())
				.latitude(detail.getLatitude())
				.longitude(detail.getLongitude())
				.build();
		}
	}
}
