package com.jobseek.speedjobs.domain.resume.details;

import com.jobseek.speedjobs.domain.resume.Resume;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "certificates")
public class Certificate {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cert_id")
	private Long id;

	private String certName;

	@Column(unique = true)
	private String certNumber;

	private String institute;

	private LocalDateTime certDate;

	private int score;

	private int degree;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "resume_id")
	private Resume resume;
}
