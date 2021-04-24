package com.jobseek.speedjobs.dto.user;

import lombok.Data;

@Data
public class UserUpdateRequest {

	//유저
	private String password;
	private String picture;
	private String contact;
	//멤버
	private String birth;
	private String nickname;
	private String intro;
	//기업
	private String companyName;
	private String logoImage;
	private String scale;
	//기업디테일
	private String registrationNumber;
	private String description;
	private String homepage;
}
