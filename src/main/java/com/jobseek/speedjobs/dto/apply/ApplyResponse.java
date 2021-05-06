package com.jobseek.speedjobs.dto.apply;

import com.jobseek.speedjobs.domain.resume.Apply;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplyResponse {

	private Long applyId;
	private Long memberId;
	private Long companyId;
	private Long recruitId;
	private Long resumeId;

	public static ApplyResponse of(Apply apply) {
		return ApplyResponse.builder()
			.applyId(apply.getId())
			.memberId(apply.getMemberId())
			.companyId(apply.getCompanyId())
			.recruitId(apply.getRecruit().getId())
			.resumeId(apply.getResume().getId())
			.build();
	}
}
