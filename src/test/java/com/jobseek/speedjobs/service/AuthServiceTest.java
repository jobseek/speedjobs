package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Provider.GOOGLE;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.auth.LocalLoginRequest;
import com.jobseek.speedjobs.dto.auth.SocialLoginRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.util.JwtUtil;
import com.jobseek.speedjobs.util.RedisUtil;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

	private Member localMember;
	private Member socialMember;

	private AuthService authService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private JwtUtil jwtUtil;

	@Mock
	private RedisUtil redisUtil;

	@Mock
	private PasswordEncoder passwordEncoder;

	@BeforeEach
	void setUp() {
		authService = new AuthService(userRepository, memberRepository, jwtUtil, redisUtil,
			passwordEncoder);

		localMember = Member.builder()
			.id(1L)
			.email("member@member.com")
			.password("memberTest1!")
			.role(ROLE_MEMBER)
			.build();
		socialMember = Member.builder()
			.id(2L)
			.oauthId("abcd1234")
			.provider(GOOGLE)
			.role(ROLE_MEMBER)
			.build();
	}

	@DisplayName("로컬 로그인")
	@Test
	void localLogin() {
		LocalLoginRequest request = LocalLoginRequest.builder()
			.email(localMember.getEmail())
			.password(localMember.getPassword())
			.provider(Provider.LOCAL)
			.build();
		given(userRepository.findByEmail(any())).willReturn(Optional.of(localMember));
		given(passwordEncoder.matches(any(), any())).willReturn(true);
		given(jwtUtil.createAccessToken(any())).willReturn("access token");
		given(jwtUtil.createRefreshToken(any())).willReturn("refresh token");

		TokenResponse response = authService.localLogin(request);

		assertEquals("access token", response.getAccessToken());
		assertEquals("refresh token", response.getRefreshToken());
	}

	@DisplayName("소셜 로그인")
	@Test
	void socialLogin() {
		SocialLoginRequest request = SocialLoginRequest.builder()
			.oauthId(socialMember.getOauthId())
			.provider(socialMember.getProvider())
			.build();
		given(memberRepository.findByProviderAndOauthId(any(), any()))
			.willReturn(Optional.of(socialMember));
		given(jwtUtil.createAccessToken(any())).willReturn("access token");
		given(jwtUtil.createRefreshToken(any())).willReturn("refresh token");

		TokenResponse response = authService.socialLogin(request);

		assertEquals("access token", response.getAccessToken());
		assertEquals("refresh token", response.getRefreshToken());
	}

	@DisplayName("로그아웃")
	@Test
	void logout() {
		given(jwtUtil.getTokenFromRequest(any(HttpServletRequest.class)))
			.willReturn("jwt.refresh.token");
		given(jwtUtil.isRefreshToken(any())).willReturn(true);
		given(redisUtil.delete(any())).willReturn(true);

		HttpServletRequest request = mock(HttpServletRequest.class);
		authService.logout(request);

		verify(redisUtil, times(1)).delete("jwt.refresh.token");
	}
}
