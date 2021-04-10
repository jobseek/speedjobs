package com.jobseek.speedjobs.domain.company;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;

import lombok.*;

import static lombok.AccessLevel.*;

@Embeddable @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
public class CompanyDetail {

	@Column(unique = true, length = 60)
	private String registrationNumber;

	@Lob
	private String description;

	@Column(length = 60)
	private String homepage;

	public static CompanyDetail from(String registrationNumber, String description,
		String homepage) {
		return new CompanyDetail(registrationNumber, description, homepage);
	}
}
