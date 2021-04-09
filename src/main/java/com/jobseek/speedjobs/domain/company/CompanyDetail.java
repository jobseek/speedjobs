package com.jobseek.speedjobs.domain.company;

import javax.persistence.Embeddable;
import javax.persistence.Lob;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CompanyDetail {

	private String registrationNumber;

	@Lob
	private String description;

	private String homepage;

	public static CompanyDetail from(String registrationNumber, String description,
		String homepage) {
		return new CompanyDetail(registrationNumber, description, homepage);
	}
}
