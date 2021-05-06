package com.jobseek.speedjobs.dto.apply;

import com.jobseek.speedjobs.domain.resume.Apply;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 개인회원이 자신의 이력서로 지원한 공고들을 조회할 때
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CompanyResponse {

	private Long applyId;
	private Long recruitId;
	private String title;
	private Long companyId;
	private String companyName;
	private String email;

	public static CompanyResponse of(Apply apply) {
		return CompanyResponse.builder()
			.applyId(apply.getId())
			.recruitId(apply.getRecruit().getId())
			.title(apply.getRecruit().getTitle())
			.companyId(apply.getCompanyId())
			.companyName(apply.getRecruit().getCompany().getCompanyName())
			.email(apply.getRecruit().getCompany().getEmail())
			.build();
	}
}
