package com.jobseek.speedjobs.dto.user.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jobseek.speedjobs.domain.member.Member;
import java.time.LocalDate;
import lombok.Data;

@Data
public class MemberUpdateRequest {

	//유저
	private String nickname;
	private String password;
	private String picture;
	private String contact;
	//멤버
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate birth;
	private String bio;
	private String gender;

}
