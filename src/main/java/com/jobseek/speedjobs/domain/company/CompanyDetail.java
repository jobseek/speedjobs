package com.jobseek.speedjobs.domain.company;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
public class CompanyDetail {

	@Column(unique = true, length = 12)
	private String registrationNumber;

	@Lob
	private String description;

	private String homepage;

	public static CompanyDetail from(String registrationNumber, String description,
		String homepage) {
		return new CompanyDetail(registrationNumber, description, homepage);
	}
}
