package com.jobseek.speedjobs.domain.resume.details;

import com.jobseek.speedjobs.domain.resume.Resume;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "careers")
public class Career {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "career_id")
	private Long id;

	@Column(length = 120)
	private String companyName;

	private String position;

	private LocalDateTime inDate; //입사날짜

	private LocalDateTime outDate; //퇴사날짜

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "resume_id")
	private Resume resume;

}
