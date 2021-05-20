package com.jobseek.speedjobs.domain.user;

import static com.jobseek.speedjobs.domain.user.Provider.LOCAL;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_ADMIN;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;

public class UserTest {

	public static final String MEMBER_EMAIL = "woojin7124@naver.com";
	public static final String MEMBER_PASSWORD = "memberPassword1!";
	public static final String MEMBER_NAME = "멤버";
	public static final String MEMBER_NICKNAME = "잡식이";
	public static final Role MEMBER_ROLE = ROLE_MEMBER;
	public static final Provider MEMBER_PROVIDER = LOCAL;

	public static final String COMPANY_EMAIL = "woojin7124@gmail.com";
	public static final String COMPANY_PASSWORD = "companyPassword1!";
	public static final String COMPANY_NAME = "잡식컴퍼니";
	public static final String COMPANY_NICKNAME = "잡식이회사";
	public static final String COMPANY_CONTACT = "010-1234-5678";
	public static final Role COMPANY_ROLE = ROLE_COMPANY;
	public static final String COMPANY_REGISTRATION_NUMBER = "123-45-99913";
	public static final String COMPANY_HOMEPAGE="https://www.jobseek.com";

	public static final String ADMIN_EMAIL = "admin@admin.com";
	public static final String ADMIN_PASSWORD = "adminPassword1!";
	public static final String ADMIN_NAME = "관리자";
	public static final String ADMIN_NICKNAME = "관리자";
	public static final Role ADMIN_ROLE = ROLE_ADMIN;

	public static final UserDto MEMBER_DTO = UserDto.builder()
		.email(MEMBER_EMAIL)
		.password(MEMBER_PASSWORD)
		.name(MEMBER_NAME)
		.nickname(MEMBER_NICKNAME)
		.role(ROLE_MEMBER)
		.provider(MEMBER_PROVIDER)
		.build();

	public static final UserDto COMPANY_DTO = UserDto.builder()
		.email(COMPANY_EMAIL)
		.password(COMPANY_PASSWORD)
		.name(COMPANY_NAME)
		.nickname(COMPANY_NICKNAME)
		.role(ROLE_GUEST)
		.build();
}
