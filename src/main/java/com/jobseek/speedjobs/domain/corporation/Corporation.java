package com.jobseek.speedjobs.domain.corporation;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "corporations")
public class Corporation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "corp_id")
	private Long id;

	private String corporationName;

	private String logoImage;

	private int scale;

	@Embedded
	private CorporationDetail corporationDetail;

	@OneToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "corporation", cascade = ALL)
	private List<Recruit> recruitList = new ArrayList<>();
}
