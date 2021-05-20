package com.jobseek.speedjobs.dto.resume;

import static lombok.AccessLevel.PRIVATE;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PRIVATE)
public class ResumeRequest {

	@NotNull
	private Open open;

	private String coverLetter;

	private String title;

	private String name;

	private String gender;

	private String contact;

	private LocalDate birth;

	private String address;

	private String githubUrl;

	private String blogUrl;

	private String resumeImage;

	private List<Career> careers;

	private List<Scholar> scholars;

	private List<Certificate> certificates;

	private List<Long> tags;

	public ResumeRequest(Open open, String coverLetter, String title, String name, String gender,
		String contact, LocalDate birth, String address, String githubUrl, String blogUrl,
		String resumeImage,
		List<Career> careers,
		List<Scholar> scholars,
		List<Certificate> certificates,
		List<Long> tags
	) {
		this.open = open;
		this.coverLetter = coverLetter;
		this.title = title;
		this.name = name;
		this.gender = gender;
		this.contact = contact;
		this.birth = birth;
		this.address = address;
		this.githubUrl = githubUrl;
		this.blogUrl = blogUrl;
		this.resumeImage = resumeImage;
		this.careers = careers;
		this.scholars = scholars;
		this.certificates = certificates;
		this.tags = tags;
	}

	public Resume toEntity() {
		return Resume.builder()
			.open(open)
			.coverLetter(coverLetter)
			.title(title)
			.name(name)
			.gender(gender)
			.contact(contact)
			.birth(birth)
			.address(address)
			.blogUrl(blogUrl)
			.githubUrl(githubUrl)
			.resumeImage(resumeImage)
			.build();
	}
}
