package com.jobseek.speedjobs.domain.resume;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "applies")
public class Apply {

	@Id @GeneratedValue
	@Column(name = "apply_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "resume_id")
	private Resume resume;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "recruit_id")
	private Recruit recruit;
}
