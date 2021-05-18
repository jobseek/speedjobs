package com.jobseek.speedjobs.domain.resume;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.ResumeTag;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import com.jobseek.speedjobs.domain.tag.Tag;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

@Entity
@Getter
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
	private List<Certificate> certificates = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "scholar", joinColumns = @JoinColumn(name = "resume_id"))
	private List<Scholar> scholars = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "career", joinColumns = @JoinColumn(name = "resume_id"))
	private List<Career> careers = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "resume_tags", joinColumns = @JoinColumn(name = "resume_id"))
	private List<ResumeTag> tags = new ArrayList<>();

	@OneToMany(mappedBy = "resume", cascade = {PERSIST, MERGE}, orphanRemoval = true)
	private final List<Apply> applies = new ArrayList<>();

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

	public static Resume createResume(Open open, String coverLetter, String title, String name,
		String gender,
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

	public void addMoreInfo(List<Career> careers, List<Scholar> scholars,
		List<Certificate> certificates) {
		Optional.ofNullable(careers).ifPresent(i -> this.careers.addAll(i));
		Optional.ofNullable(scholars).ifPresent(i -> this.scholars.addAll(i));
		Optional.ofNullable(certificates).ifPresent(i -> this.certificates.addAll(i));
	}

	public void updateMoreInfo(List<Career> careers, List<Scholar> scholars,
		List<Certificate> certificates) {
		Optional.ofNullable(careers).ifPresent(i -> this.careers.clear());
		Optional.ofNullable(scholars).ifPresent(i -> this.scholars.clear());
		Optional.ofNullable(certificates).ifPresent(i -> this.certificates.clear());
		addMoreInfo(careers, scholars, certificates);
	}

	public void update(Resume resume) {
		this.open = resume.open;
		this.coverLetter = resume.coverLetter;
		this.title = resume.title;
		this.name = resume.name;
		this.gender = resume.gender;
		this.contact = resume.contact;
		this.birth = resume.birth;
		this.address = resume.address;
		this.githubUrl = resume.githubUrl;
		this.blogUrl = resume.blogUrl;
		this.resumeImage = resume.resumeImage;
		this.certificates = resume.certificates;
		this.scholars = resume.scholars;
		this.careers = resume.careers;
	}

	// 로직
	public void applyTo(Recruit recruit) {
		Apply apply = Apply.builder()
			.resume(this)
			.recruit(recruit)
			.memberId(this.getMember().getId())
			.companyId(recruit.getCompany().getId())
			.build();
		this.getApplies().add(apply);
		recruit.getApplies().add(apply);
	}

	public void addTags(List<Tag> tags) {
		for (Tag tag : tags) {
			ResumeTag resumeTag = ResumeTag.builder()
				.id(tag.getId())
				.name(tag.getName())
				.type(tag.getType())
				.build();
			this.tags.add(resumeTag);
		}
	}

	public void updateTags(List<Tag> tags) {
		this.tags.clear();
		addTags(tags);
	}

}
