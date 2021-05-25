package com.jobseek.speedjobs.dto.user.company;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class CompanyInfoResponse {

	// user
	private String name;
	private String nickname;
	private String email;
	private String contact;
	private String picture;

	// company
	private String companyName;
	private String logoImage;
	private Integer scale;

	// detail
	private String registrationNumber;
	private String description;
	private String homepage;
	private String address;
	private String detailedAddress;
	private Integer avgSalary;
	private Double latitude;
	private Double longitude;

	public static CompanyInfoResponse of(Company company) {
		CompanyDetail detail = company.getCompanyDetail();

		return CompanyInfoResponse.builder()
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
