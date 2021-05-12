package com.jobseek.speedjobs.dto.resume;

import com.jobseek.speedjobs.domain.resume.Open;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResumeSearchCondition {

	private Open open;

	private String title;
}
