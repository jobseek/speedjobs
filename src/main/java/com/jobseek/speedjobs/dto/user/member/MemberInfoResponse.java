package com.jobseek.speedjobs.dto.user.member;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.member.Member;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class MemberInfoResponse {

	private String name;
	private String email;
	private String contact;
	private String picture;

	//detail
	private LocalDate birth;
	private String bio;
	private String nickname;
	private String gender;

	public static MemberInfoResponse of(Member member) {
		return MemberInfoResponse.builder()
			.name(member.getName())
			.email(member.getEmail())
			.contact(member.getContact())
			.picture(member.getPicture())
			.birth(member.getBirth())
			.bio(member.getBio())
			.nickname(member.getNickname())
			.gender(member.getGender()).build();
	}
}
