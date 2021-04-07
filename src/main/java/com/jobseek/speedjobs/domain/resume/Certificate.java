package com.jobseek.speedjobs.domain.resume;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "certificates")
public class Certificate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
