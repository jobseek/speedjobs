package com.jobseek.speedjobs.domain.resume;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "careers")
public class Career {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "career_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "resume_id")
	private Resume resume;

}
