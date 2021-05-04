package com.jobseek.speedjobs.dto.resume;

import static lombok.AccessLevel.PRIVATE;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.ResumeTag;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PRIVATE)
public class ResumeRequest {

//	@NotNull
	private Open open;

//	@NotBlank
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

	private List<Career> careerList;

	private List<Scholar> scholarList;

	private List<Certificate> certificateList;

	private List<Long> tagIds;

	public ResumeRequest(Open open, String coverLetter, String title, String name, String gender,
		String contact, LocalDate birth, String address, String githubUrl, String blogUrl,
		String resumeImage,
		List<Career> careerList,
		List<Scholar> scholarList,
		List<Certificate> certificateList,
		List<Long> tagIds
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
		this.careerList = careerList;
		this.scholarList = scholarList;
		this.certificateList = certificateList;
		this.tagIds = tagIds;
	}

	public Resume toEntity() {
		return Resume
			.createResume(open, coverLetter, title, name, gender, contact, birth, address, blogUrl,
				githubUrl, resumeImage);
	}
}
