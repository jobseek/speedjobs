package com.jobseek.speedjobs.dto.resume;

import com.jobseek.speedjobs.domain.resume.Open;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeSearchCondition {

	private Open open;

	private String title;
}
