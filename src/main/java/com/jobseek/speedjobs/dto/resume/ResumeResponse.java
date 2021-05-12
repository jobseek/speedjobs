package com.jobseek.speedjobs.dto.resume;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

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
			.createdDate(resume.getCreatedDate())
			.modifiedDate(resume.getModifiedDate())
			.build();
	}
}
