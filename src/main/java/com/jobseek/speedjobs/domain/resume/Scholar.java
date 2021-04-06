package com.jobseek.speedjobs.domain.resume;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "scholars")
public class Scholar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "scholar_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "resume_id")
	private Resume resume;
}
