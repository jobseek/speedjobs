package com.jobseek.speedjobs.domain.resume;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.member.Member;
import lombok.*;

import javax.persistence.*;
import javax.swing.text.Caret;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "resumes")
public class Resume extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "resume_id")
	private Long id;

	private String open;

	private String coverLetter;

	private String address;

	private String blogUrl;

	private String githubUrl;

	private String resumeImage;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "resume", cascade = ALL)
	private List<Certificate> certificateList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", cascade = ALL)
	private List<Scholar> scholarList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", cascade = ALL)
	private List<Career> careerList = new ArrayList<>();

}
