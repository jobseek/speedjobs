package com.jobseek.speedjobs.dto.user.member;

import java.time.LocalDate;
import lombok.Data;

@Data
public class MemberUpdateRequest {
	//유저
	private String password;
	private String picture;
	private String contact;
	//멤버
	private LocalDate birth;
	private String nickname;
	private String intro;
	private String sex;
}
