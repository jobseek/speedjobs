package com.jobseek.speedjobs.dto.apply;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.resume.Resume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class MemberResponse {

	private Long applyId;
	private Long resumeId;
	private String title;
	private Long memberId;
	private String email;
	private String contact;
	private String name;

	public static MemberResponse of(Apply apply) {
		Resume resume = apply.getResume();
		Member member = resume.getMember();

		return MemberResponse.builder()
			.applyId(apply.getId())
			.resumeId(resume.getId())
			.title(resume.getTitle())
			.memberId(member.getId())
			.email(resume.getEmail())
			.contact(member.getContact())
			.name(member.getName())
			.build();
	}
}
