package com.jobseek.speedjobs.dto.user.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
@AllArgsConstructor
public class MemberUpdateRequest {

	//유저
	@NotBlank
	@Length(min = 2, max = 15)
	private final String name;

	@NotBlank
	@Length(min = 2, max = 15)
	private final String nickname;

	private final String password;
	private final String picture;
	private final String contact;
	//멤버
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private final LocalDate birth;
	private final String bio;
	private final String gender;

}
