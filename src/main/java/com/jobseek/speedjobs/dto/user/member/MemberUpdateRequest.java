package com.jobseek.speedjobs.dto.user.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Data;

@Data
public class MemberUpdateRequest {
	//유저
	private String password;
	private String picture;
	private String contact;
	//멤버
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate birth;
	private String nickname;
	private String bio;
	private String sex;
}
