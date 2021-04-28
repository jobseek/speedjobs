package com.jobseek.speedjobs.dto.resume;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResumeResponse {

	private Long id;
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
	private List<Certificate> certificateList;
	private List<Scholar> scholarList;
	private List<Career> careerList;

	public ResumeResponse(Resume resume) {
		this.id = resume.getId();
		this.open = resume.getOpen();
		this.coverLetter = resume.getCoverLetter();
		this.title = resume.getTitle();
		this.name = resume.getName();
		this.gender = resume.getGender();
		this.contact = resume.getContact();
		this.birth = resume.getBirth();
		this.address = resume.getAddress();
		this.blogUrl = resume.getBlogUrl();
		this.githubUrl = resume.getGithubUrl();
		this.resumeImage = resume.getResumeImage();
		this.certificateList = resume.getCertificateList();
		this.scholarList = resume.getScholarList();
		this.careerList = resume.getCareerList();
	}

	@Builder
	public ResumeResponse(Long id, Open open, String coverLetter, String title,
		String name, String gender, String contact, LocalDate birth, String address,
		String blogUrl, String githubUrl, String resumeImage,
		List<Certificate> certificateList,
		List<Scholar> scholarList,
		List<Career> careerList) {
		this.id = id;
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
		this.certificateList = certificateList;
		this.scholarList = scholarList;
		this.careerList = careerList;
	}

	public static ResumeResponse of(Resume resume) {
		return ResumeResponse.builder()
			.id(resume.getId())
			.open(resume.getOpen())
			.coverLetter(resume.getCoverLetter())
			.title(resume.getTitle())
			.name(resume.getName())
			.gender(resume.getGender())
			.contact(resume.getContact())
			.birth(resume.getBirth())
			.address(resume.getAddress())
			.blogUrl(resume.getBlogUrl())
			.githubUrl(resume.getGithubUrl())
			.resumeImage(resume.getResumeImage())
			.certificateList(resume.getCertificateList())
			.scholarList(resume.getScholarList())
			.careerList(resume.getCareerList())
			.build();
	}
}
