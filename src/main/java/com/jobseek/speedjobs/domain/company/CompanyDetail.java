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

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = PRIVATE)
public class CompanyDetail {

	@Column(unique = true, length = 12)
	private String registrationNumber;

	@Lob
	private String description;

	private String homepage;

	private String address;

	private String detailedAddress;

	private Integer avgSalary; // 단위: 만원

	private Double latitude; // 위도

	private Double longitude; // 경도

	public static CompanyDetail from(String registrationNumber, String description,
		String homepage, String address, String detailedAddress, Integer avgSalary, Double latitude,
		Double longitude) {
		return new CompanyDetail(registrationNumber, description,
			homepage, address, detailedAddress, avgSalary, latitude, longitude);
	}
}
