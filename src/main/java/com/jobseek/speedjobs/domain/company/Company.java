package com.jobseek.speedjobs.domain.company;

import static javax.persistence.CascadeType.ALL;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "companies")
public class Company extends User {

	@OneToMany(mappedBy = "company", cascade = ALL, orphanRemoval = true)
	private final List<Recruit> recruitList = new ArrayList<>();

	private String companyName;

	private String logoImage;

	private int scale;

	@Embedded
	private CompanyDetail companyDetail;

	public Company(String name, String nickname, String email, String password,
		String picture, String contact, Role role, String companyName, String logoImage, int scale,
		CompanyDetail companyDetail) {
		super(name, nickname, email, password, picture, contact, role);
		this.companyName = companyName;
		this.logoImage = logoImage;
		this.scale = scale;
		this.companyDetail = companyDetail;
	}

	public Company updateCompanyInfo(String name, String nickname, String picture, String contact,
		String companyName, int scale, CompanyDetail companyDetail) {
		updateCustomUserInfo(name, nickname, picture, contact);
		this.companyName = companyName;
		this.scale = scale;
		this.companyDetail = companyDetail;
		return this;
	}

}
