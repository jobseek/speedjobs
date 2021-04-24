package com.jobseek.speedjobs.dto.user.company;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CompanyInfoResponse {

	private Long id;
	private String name;
	private String email;
	private String contact;
	private String picture;

	//company
	private String companyName;
	private String logoImage;
	private int scale;

	//detail
	private String registrationNumber;
	private String homepage;
	private String description;

	public static CompanyInfoResponse of(Company company) {
		CompanyDetail detail = company.getCompanyDetail();

		return CompanyInfoResponse.builder()
			.id(company.getId())
			.name(company.getName())
			.companyName(company.getCompanyName())
			.logoImage(company.getLogoImage())
			.scale(company.getScale())
			.registrationNumber(detail.getRegistrationNumber())
			.homepage(detail.getHomepage())
			.description(detail.getDescription()).build();
	}
}
