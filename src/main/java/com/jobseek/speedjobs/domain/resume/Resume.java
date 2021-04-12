package com.jobseek.speedjobs.domain.resume;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "resumes")
public class Resume extends BaseTimeEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "resume_id")
	private Long id;

	@Enumerated
	private Open open;

	private String coverLetter;

	private String address;

	private String blogUrl;

	private String githubUrl;

	private String resumeImage;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "resume", fetch = LAZY, cascade = ALL)
	private List<Certificate> certificateList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", fetch = LAZY, cascade = ALL)
	private List<Scholar> scholarList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", fetch = LAZY, cascade = ALL)
	private List<Career> careerList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", fetch = LAZY, cascade = ALL)
	private List<Apply> applies = new ArrayList<>();

}
