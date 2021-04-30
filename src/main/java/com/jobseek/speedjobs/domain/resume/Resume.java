package com.jobseek.speedjobs.domain.resume;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "resumes")
public class Resume extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "resume_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	private Open open;

	private String coverLetter;

	private String title;

	private String name;

	private String gender;

	private String contact;

	private LocalDate birth;

	private String address;

	private String blogUrl;

	private String githubUrl;

	private String resumeImage;

	@ManyToOne(fetch = LAZY, cascade = PERSIST)
	@JoinColumn(name = "member_id")
	private Member member;

	@ElementCollection
	@CollectionTable(name = "certificate", joinColumns = @JoinColumn(name = "resume_id"))
	private List<Certificate> certificateList = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "scholar", joinColumns = @JoinColumn(name = "resume_id"))
	private List<Scholar> scholarList = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "career", joinColumns = @JoinColumn(name = "resume_id"))
	private List<Career> careerList = new ArrayList<>();

	@OneToMany(mappedBy = "resume", cascade = ALL, orphanRemoval = true)
	private List<Apply> applies = new ArrayList<>();

	@Builder
	public Resume(Open open, String coverLetter, String title, String name, String gender,
		String contact, LocalDate birth, String address, String blogUrl, String githubUrl,
		String resumeImage) {
		this.open = open;
		this.coverLetter = coverLetter;
		this.title = title;
		this.name = name;
		this.gender = gender;
		this.contact = contact;
		this.birth = birth;
		this.address = address;
		this.blogUrl = blogUrl;
		this.githubUrl = githubUrl;
		this.resumeImage = resumeImage;
	}

	public static Resume createResume(Open open, String coverLetter, String title, String name, String gender,
		String contact, LocalDate birth, String address, String blogUrl, String githubUrl,
		String resumeImage) {
		return new Resume(open, coverLetter, title, name, gender, contact, birth, address, blogUrl,
			githubUrl, resumeImage);
	}

	//연관관계 편의 메서드
	public void setMember(Member member) {
		this.member = member;
		member.getResumeList().add(this);
	}

	public void addMoreInfo(List<Career> careers, List<Scholar> scholars, List<Certificate> certificates) {
		if (careers != null) {
			this.careerList.addAll(careers);
		}
		if (scholars != null) {
			this.scholarList.addAll(scholars);
		}
		if (certificates != null) {
			this.certificateList.addAll(certificates);
		}
	}

	public void updateInfo(List<Career> careers, List<Scholar> scholars, List<Certificate> certificates) {
		if (careers != null) {
			this.careerList.clear();
		}
		if (scholars != null) {
			this.scholarList.clear();
		}
		if (certificates != null) {
			this.certificateList.clear();
		}
		addMoreInfo(careers,scholars,certificates);
	}

	public void update(Resume resume) {
		this.open = resume.getOpen();
		this.coverLetter = resume.getCoverLetter();
		this.address = resume.getAddress();
		this.blogUrl = resume.getBlogUrl();
		this.githubUrl = resume.getGithubUrl();
		this.resumeImage = resume.getResumeImage();
		this.certificateList = resume.getCertificateList();
		this.scholarList = resume.getScholarList();
		this.careerList = resume.getCareerList();
	}

}
