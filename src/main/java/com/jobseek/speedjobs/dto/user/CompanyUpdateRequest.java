package com.jobseek.speedjobs.dto.user;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class CompanyUpdateRequest {

	@NotBlank
	@Length(min = 2, max = 15)
	private String name;

	@NotBlank
	@Length(min = 2, max = 15)
	private String nickname;

	private String password;

	private String picture;

	@NotBlank
	private String contact;

	@NotBlank
	private String companyName;

	@Positive
	private Integer scale;

	@NotBlank
	private String registrationNumber;

	private String description;

	@NotBlank
	private String homepage;

	@NotBlank
	private String address;

	private String detailedAddress;

	@Positive
	private Integer avgSalary;

	@NotNull
	private Double latitude;

	@NotNull
	private Double longitude;

	public Company toEntity() {
		CompanyDetail detail = CompanyDetail
			.from(registrationNumber, description, homepage, address,
				detailedAddress, avgSalary, latitude, longitude);
		return Company.builder()
			.name(name)
			.nickname(nickname)
			.picture(picture)
			.contact(contact)
			.companyName(companyName)
			.scale(scale == null ? 0 : scale)
			.companyDetail(detail)
			.build();
	}
}
