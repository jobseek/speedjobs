package com.jobseek.speedjobs.domain.recruit;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "recruits")
public class Recruit extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "recruit_id")
	private Long id;

	private String title;

	private LocalDateTime startRecruit;

	private LocalDateTime finishRecruit;

	@Enumerated
	private Status state;

	private String thumbnail;

	@ColumnDefault("0")
	private int likeCount;

	@ColumnDefault("0")
	private int viewCount;

	@Embedded
	private RecruitDetail recruitDetail;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "corp_id")
	private Company company;
}
