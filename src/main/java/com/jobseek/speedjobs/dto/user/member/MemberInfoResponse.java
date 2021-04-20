package com.jobseek.speedjobs.dto.user.member;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDate;
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
	private LocalDate birth;
	private String intro;
	private String nickname;
	private String sex;

	public static MemberInfoResponse of(Member member) {
		return MemberInfoResponse.builder()
			.id(member.getId())
			.name(member.getName())
			.email(member.getEmail())
			.picture(member.getPicture())
			.birth(member.getBirth())
			.intro(member.getBio())
			.nickname(member.getNickname())
			.sex(member.getSex()).build();
	}
}
