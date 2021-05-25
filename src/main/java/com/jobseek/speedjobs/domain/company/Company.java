package com.jobseek.speedjobs.domain.company;

import static javax.persistence.CascadeType.ALL;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = PROTECTED)
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "companies")
public class Company extends User {

	@OneToMany(mappedBy = "company", cascade = ALL, orphanRemoval = true)
	private final List<Recruit> recruits = new ArrayList<>();

	@Column(unique = true)
	private String companyName;

	private String logoImage;

	private int scale;

	@Embedded
	private CompanyDetail companyDetail;

	public void updateCompanyInfo(Company company) {
		updateCustomUserInfo(company.getName(), company.getNickname(), company.getPicture(),
			company.getContact());
		this.companyName = company.companyName;
		this.scale = company.scale;
		this.companyDetail = company.companyDetail;
	}

}
