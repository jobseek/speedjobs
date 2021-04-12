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
@Table(name = "scholars")
public class Scholar {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "scholar_id")
	private Long id;

	@Enumerated
	private School finalEducation;

	@Column(length = 70)
	private String schoolName;

	@Column(length = 50)
	private String major;

	private LocalDateTime inDate; //입학날짜

	private LocalDateTime outDate; //졸업날짜

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "resume_id")
	private Resume resume;
}
