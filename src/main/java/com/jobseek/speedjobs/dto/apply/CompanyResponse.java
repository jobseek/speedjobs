package com.jobseek.speedjobs.dto.apply;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.resume.Apply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class CompanyResponse {

	private Long applyId;
	private Long recruitId;
	private String title;
	private Long companyId;
	private String companyName;
	private String email;
	private String contact;

	public static CompanyResponse of(Apply apply) {
		Recruit recruit = apply.getRecruit();
		Company company = recruit.getCompany();

		return CompanyResponse.builder()
			.applyId(apply.getId())
			.recruitId(recruit.getId())
			.title(recruit.getTitle())
			.companyId(company.getId())
			.companyName(company.getCompanyName())
			.email(company.getEmail())
			.contact(company.getContact())
			.build();
	}
}
