package com.jobseek.speedjobs.dto.resume;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class ResumeRequest {

	@NotNull
	private Open open;

	@NotBlank
	private String coverLetter;

	@NotBlank
	private String title;

	@NotBlank
	private String name;

	@NotBlank
	private String gender;

	@Email
	private String email;

	@NotBlank
	private String contact;

	@NotNull
	private LocalDate birth;

	@NotBlank
	private String address;

	private String githubUrl;

	private String blogUrl;

	private String resumeImage;

	private List<Career> careers;

	private List<Scholar> scholars;

	private List<Certificate> certificates;

	private List<Long> tags;

	public Resume toEntity() {
		return Resume.builder()
			.open(open)
			.coverLetter(coverLetter)
			.title(title)
			.name(name)
			.gender(gender)
			.email(email)
			.contact(contact)
			.birth(birth)
			.address(address)
			.blogUrl(blogUrl)
			.githubUrl(githubUrl)
			.resumeImage(resumeImage)
			.build();
	}
}
