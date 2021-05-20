package com.jobseek.speedjobs.dto.apply;

import com.jobseek.speedjobs.domain.resume.Apply;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 회사가 자신의 공고로 지원된 이력서내역들을 조회할 때
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberResponse {

	private Long applyId;
	private Long resumeId;
	private String title;
	private Long memberId;
	private String email;
	private String name;

	public static MemberResponse of(Apply apply) {
		return MemberResponse.builder()
			.applyId(apply.getId())
			.resumeId(apply.getResume().getId())
			.title(apply.getResume().getTitle())
			.memberId(apply.getMemberId())
			.email(apply.getResume().getMember().getEmail())
			.name(apply.getResume().getMember().getName())
			.build();
	}
}
