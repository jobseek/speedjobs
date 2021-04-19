package com.jobseek.speedjobs.dto.resume;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.jobseek.speedjobs.domain.resume.Open;
import com.jobseek.speedjobs.domain.resume.details.Career;
import com.jobseek.speedjobs.domain.resume.details.Certificate;
import com.jobseek.speedjobs.domain.resume.details.Scholar;
import com.jobseek.speedjobs.dto.resume.detail.CareerDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
