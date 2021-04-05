package com.jobseek.speedjobs.domain.recruit;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "recruits")
public class Recruit extends BaseTimeEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 40)
	private String title;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date start_recruit;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date finish_recruit;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Active activate;

	@Column(nullable = false, length = 150)
	private String thumbnail;

	@Column(nullable = false, columnDefinition = "default 0")
	private int like_count;

	@Column(nullable = false, columnDefinition = "default 0")
	private int view_count;
}
