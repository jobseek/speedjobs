package com.jobseek.speedjobs.domain.company;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.likelist.CompanyLike;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "companies")
public class Company extends User {

	@Column(length = 100)
	private String companyName;

	@Column(length = 120)
	private String logoImage;

	private int scale;

	@Embedded
	private CompanyDetail companyDetail;

	@OneToMany(mappedBy = "company", fetch = LAZY, cascade = ALL)
	private List<Recruit> recruitList = new ArrayList<>();

	@OneToMany(mappedBy = "company", fetch = LAZY, cascade = ALL)
	private List<CompanyLike> companyLikes = new ArrayList<>();

	public Company(UserDto userDto) {
		super(userDto.getName(), userDto.getEmail(), userDto.getPassword(), userDto.getPicture(),
			userDto.getRole());
		this.companyName = userDto.getCompanyName();
		this.logoImage = userDto.getLogoImage();
		this.scale = userDto.getScale();
		this.companyDetail = userDto.getCompanyDetail();
	}

}
