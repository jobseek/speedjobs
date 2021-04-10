package com.jobseek.speedjobs.domain.likelist;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "company_like_list")
public class CompanyLikeList {

	@Id @GeneratedValue
	@Column(name = "company_like_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "company_id")
	private Company company;

}
