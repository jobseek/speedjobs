package com.jobseek.speedjobs.dto.user.member;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfoResponse {

	private Long id;
	private String name;
	private String email;
	private String contact;
	private String picture;

	//detail
	private String birth;
	private String intro;
	private String nickname;
	private String sex;

	public static MemberInfoResponse of(User user) {
		Member member = user.getMember();

		return MemberInfoResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.email(user.getEmail())
			.contact(user.getContact())
			.picture(user.getPicture())
			.birth(member.getBirth())
			.intro(member.getIntro())
			.nickname(member.getNickname())
			.sex(member.getSex()).build();
	}
}
