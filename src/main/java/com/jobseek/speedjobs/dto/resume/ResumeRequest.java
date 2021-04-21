package com.jobseek.speedjobs.dto.resume;

import static lombok.AccessLevel.*;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.util.List;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = PRIVATE)
public class ResumeRequest {

	@Enumerated(EnumType.STRING)
	private Open open;

	private String coverLetter;

	private String address;

	private String blogUrl;

	private String githubUrl;

	private String resumeImage;

	private List<Career> careerList;

	private List<Scholar> scholarList;

	private List<Certificate> certificateList;

	public ResumeRequest(Open open, String coverLetter, String address, String blogUrl,
		String githubUrl, String resumeImage,
		List<Career> careerList,
		List<Scholar> scholarList,
		List<Certificate> certificateList) {
		this.open = open;
		this.coverLetter = coverLetter;
		this.address = address;
		this.blogUrl = blogUrl;
		this.githubUrl = githubUrl;
		this.resumeImage = resumeImage;
		this.careerList = careerList;
		this.scholarList = scholarList;
		this.certificateList = certificateList;
	}

	public Resume toEntity() {
		return Resume.createResume(open, coverLetter, address, blogUrl, githubUrl, resumeImage,
			certificateList, scholarList, careerList);
	}
}
