package com.jobseek.speedjobs.dto.user.member;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jobseek.speedjobs.domain.member.Member;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class MemberUpdateRequest {

	//유저
	@NotBlank
	@Length(min = 2, max = 15)
	private String name;

	@NotBlank
	@Length(min = 2, max = 15)
	private String nickname;

	private String password;
	private String picture;
	private String contact;
	//멤버
	@JsonFormat(timezone = "Asia/Seoul")
	private LocalDate birth;
	private String bio;
	private String gender;

	public Member toEntity() {
		return Member.builder()
			.name(name)
			.nickname(nickname)
			.picture(picture)
			.contact(contact)
			.birth(birth)
			.bio(bio)
			.gender(gender)
			.build();
	}
}
