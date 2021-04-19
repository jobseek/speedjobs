package com.jobseek.speedjobs.dto.user.company;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
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

	public static CompanyInfoResponse of(User user) {
		Company company = user.getCompany();
		CompanyDetail detail = company.getCompanyDetail();

		return CompanyInfoResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.email(user.getEmail())
			.contact(user.getContact())
			.picture(user.getPicture())
			.companyName(company.getCompanyName())
			.logoImage(company.getLogoImage())
			.scale(company.getScale())
			.registrationNumber(detail.getRegistrationNumber())
			.homepage(detail.getHomepage())
			.description(detail.getDescription()).build();
	}
}
