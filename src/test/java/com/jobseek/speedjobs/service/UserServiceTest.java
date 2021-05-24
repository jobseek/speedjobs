package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_CONTACT;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_EMAIL;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_HOMEPAGE;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_NAME;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_PASSWORD;
import static com.jobseek.speedjobs.domain.user.UserTest.COMPANY_REGISTRATION_NUMBER;
import static com.jobseek.speedjobs.domain.user.UserTest.MEMBER_EMAIL;
import static com.jobseek.speedjobs.domain.user.UserTest.MEMBER_NAME;
import static com.jobseek.speedjobs.domain.user.UserTest.MEMBER_PASSWORD;
import static com.jobseek.speedjobs.domain.user.UserTest.MEMBER_ROLE;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@TestMethodOrder(OrderAnnotation.class)
@SpringBootTest
class UserServiceTest {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	private User findByEmail(String email) {
		return userRepository.findByEmail(COMPANY_EMAIL)
			.orElseThrow(() -> new UsernameNotFoundException("존재하지 않습니다."));
	}

	@Order(1)
	@DisplayName("일반회원 회원가입")
	@Test
	public void registerMember() {
		UserSaveRequest request = UserSaveRequest.builder()
			.name(MEMBER_NAME)
			.email(MEMBER_EMAIL)
			.password(MEMBER_PASSWORD)
			.role(MEMBER_ROLE)
			.build();
		String key = userService.register(request);

		userService.saveCustomUser(key);
		assertEquals(userRepository.findByEmail(MEMBER_EMAIL)
			.orElseThrow(() -> new UsernameNotFoundException("존재하지 않습니다.")).getName(), MEMBER_NAME);
	}

	@Order(2)
	@DisplayName("기업회원 회원가입")
	@Test
	public void registerCompany() {
		UserSaveRequest request = UserSaveRequest.builder()
			.name(COMPANY_NAME)
			.email(COMPANY_EMAIL)
			.password(COMPANY_PASSWORD)
			.role(ROLE_GUEST)
			.companyName(COMPANY_NAME)
			.registrationNumber(COMPANY_REGISTRATION_NUMBER)
			.contact(COMPANY_CONTACT)
			.homepage(COMPANY_HOMEPAGE)
			.build();
		String key = userService.register(request);

		userService.saveCustomUser(key);
		assertEquals(findByEmail(COMPANY_EMAIL).getName(), COMPANY_NAME);
	}

	@Order(3)
	@DisplayName("기업회원 가입 승인")
	@Test
	public void approveCompany() {
		User guest = findByEmail(COMPANY_EMAIL);
		userService.approveCompany(guest.getId());
		User company = findByEmail(COMPANY_EMAIL);
		assertEquals(company.getRole(), ROLE_COMPANY);
	}

}

