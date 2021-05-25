package com.jobseek.speedjobs.dto.user.company;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

	//유저
	@NotBlank
	@Length(min = 2, max = 15)
	private String name;

	@NotBlank
	@Length(min = 2, max = 15)
	private String nickname;

	@NotBlank
	private String companyName;

	private String password;

	private String picture;

	@NotBlank
	private String contact;

	@NotNull
	private Integer scale;

	@NotBlank
	private String registrationNumber;

	private String description;

	@NotBlank
	private String homepage;

	@NotBlank
	private String address;

	private String detailedAddress;

	@NotNull
	private Integer avgSalary;

	@NotNull
	private Double latitude;

	@NotNull
	private Double longitude;

	public CompanyDetail getCompanyDetail() {
		return CompanyDetail.from(registrationNumber, description, homepage, address,
			detailedAddress, avgSalary, latitude, longitude);
	}

	public Company toEntity() {
		return Company.builder()
			.name(name)
			.nickname(nickname)
			.picture(picture)
			.contact(contact)
			.companyName(companyName)
			.scale(scale)
			.companyDetail(getCompanyDetail())
			.build();
	}
}
