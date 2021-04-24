package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.member.MemberUpdateRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	private Long Id;

	@BeforeEach
	void SetUp() {
		UserSaveRequest user = UserSaveRequest.builder().name("테스트").email("test@test.com")
			.password("testPassword").role(Role.ROLE_MEMBER).build();
		String key = userService.sendEmail(user);
		Id = userService.saveCustomUser(key);
	}

	@AfterEach
	void After() {
		userService.delete(Id);
	}

	@Test
	@DisplayName("아이디로 찾기")
	void findByIdTest() {
		User user = userService.findById(Id);
		Assertions.assertThat(user.getName()).isEqualTo("테스트");
	}

	@Test
	@DisplayName("없는유저 삭제")
	void deleteNonExistedUserTest() {
		Assertions.assertThatThrownBy(() -> {
			userService.delete(21839089L);
		}).isInstanceOf(IllegalArgumentException.class);
	}

	@Test
	@DisplayName("존재하는 유저 추가")
	void addExistedUserTest() {
		UserSaveRequest user = UserSaveRequest.builder().name("테스트").email("test@test.com")
			.password("testPassword").role(Role.ROLE_MEMBER).build();

		Assertions.assertThatThrownBy(() -> {
			String key = userService.sendEmail(user);
			Id = userService.saveCustomUser(key);
		}).isInstanceOf(IllegalArgumentException.class);
	}

	@Test
	@DisplayName("조건에 맞지않은 유저 추가")
	void addWeirdUserTest() {
		UserSaveRequest user = UserSaveRequest.builder().name("1234").email("testtest.com")
			.password("testPassword").role(Role.ROLE_MEMBER).build();

		Assertions.assertThatThrownBy(() -> {
			String key = userService.sendEmail(user);
			Id = userService.saveCustomUser(key);
		}).isInstanceOf(IllegalArgumentException.class);
	}

	@Test
	@DisplayName("멤버 가져오기")
	void findMemberTest() {
		//id를 세팅할수없어서 테스트불가
		User user = User.builder().name("테스트").password("testPassword").email("test@test.com")
			.role(Role.ROLE_MEMBER).build();
		Assertions.assertThat(userService.getMember(Id, user).getName()).isEqualTo("테스트");
	}

	@Test
	@DisplayName("개인회원으로 기업회원 가져오기")
	void findCompanyTest() {
		//통과가 되지만 제대로된 테스트가 아님
		//id를 세팅할수없어서 테스트불가
		User user = User.builder().name("테스트").password("testPassword").email("test@test.com")
			.role(Role.ROLE_MEMBER).build();
		Assertions.assertThatThrownBy(() -> {
			userService.getCompany(Id, user);
		}).isInstanceOf(IllegalArgumentException.class);
	}

	@Test
	@DisplayName("회원정보업데이트")
	void updateTest() {
		//id를 세팅할수없어서 테스트불가
		User user = User.builder().name("테스트").password("testPassword").email("test@test.com")
			.role(Role.ROLE_MEMBER).build();
		MemberUpdateRequest request = new MemberUpdateRequest();
		request.setNickname("테스트닉네임");
		userService.update(Id, request);
		Assertions.assertThat(userService.getMember(Id, user).getNickname()).isEqualTo("테스트닉네임");
	}
}

