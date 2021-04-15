package com.jobseek.speedjobs.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.utils.MailUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private RedisUtil redisUtil;

	@Mock
	private MailUtil mailUtil;

	@InjectMocks
	private UserService userService = new UserService(userRepository, passwordEncoder, redisUtil, mailUtil);

	private User user;

	@BeforeEach
	void setUp() {
		user = User.builder()
			.email("member@member.com")
			.password("password")
			.name("member")
			.role(Role.ROLE_MEMBER)
			.provider(Provider.LOCAL)
			.build();
	}

	@Test
	@DisplayName("일반 회원 회원가입")
	public void customUserSignUp() {
		final String EMAIL = "woojin7124@naver.com";
		final String key = UUID.randomUUID().toString();

		UserSaveRequest request = UserSaveRequest.builder()
			.email(EMAIL)
			.password("password")
			.name("member")
			.role(Role.ROLE_MEMBER)
			.build();

		given(userRepository.save(user)).willReturn(user);
	}
}
