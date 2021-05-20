package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.config.auth.exception.InvalidTokenException;
import com.jobseek.speedjobs.config.auth.exception.OAuth2NotFoundException;
import com.jobseek.speedjobs.config.auth.exception.OAuth2RegistrationException;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.domain.user.exception.WrongPasswordException;
import com.jobseek.speedjobs.dto.auth.TokenRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.dto.user.UserTokenDto;
import com.jobseek.speedjobs.utils.JwtUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {

	private final UserRepository userRepository;
	private final MemberRepository memberRepository;
	private final JwtUtil jwtUtil;
	private final RedisUtil redisUtil;
	private final PasswordEncoder passwordEncoder;

	public TokenResponse login(TokenRequest tokenRequest, HttpServletResponse response) {
		Provider provider = tokenRequest.getProvider();
		User user;

		if (Provider.LOCAL.equals(provider)) {
			user = userRepository.findByEmail(tokenRequest.getEmail())
				.orElseThrow(() -> new NotFoundException("해당 이메일을 갖는 유저가 존재하지 않습니다."));
			if (!passwordEncoder.matches(tokenRequest.getPassword(), user.getPassword())) {
				throw new WrongPasswordException("비밀번호가 서로 일치하지 않습니다.");
			}
		} else if (Provider.contains(provider)) {
			String oauthId = tokenRequest.getOauthId();
			user = memberRepository.findByProviderAndOauthId(provider, oauthId)
				.orElseThrow(() -> new OAuth2NotFoundException("해당 OAuth2 ID를 갖는 유저가 존재하지 않습니다."));
		} else {
			throw new OAuth2RegistrationException("해당 소셜 로그인은 현재 지원하지 않습니다.");
		}

		String accessToken = jwtUtil.createAccessToken(UserTokenDto.from(user));
		String refreshToken = jwtUtil.createRefreshToken(UserTokenDto.from(user));

		redisUtil.set(refreshToken, user.getId().toString(), jwtUtil.getRefreshValidity());

		return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
	}

	public void logout(HttpServletRequest request) {
		String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.delete(refreshToken)) {
			throw new InvalidTokenException("유효하지 않은 토큰입니다.");
		}
	}

	public TokenResponse reissueToken(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.hasKey(refreshToken)) {
			throw new InvalidTokenException("유효하지 않은 토큰입니다.");
		}

		UserTokenDto userTokenDto = jwtUtil.getUserTokenDto(refreshToken);
		String accessToken = jwtUtil.createAccessToken(userTokenDto);

		return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
	}

}
