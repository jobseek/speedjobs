package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.InvalidTokenException;
import com.jobseek.speedjobs.common.exception.OAuth2RegistrationException;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.auth.TokenRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.dto.user.UserTokenDto;
import com.jobseek.speedjobs.utils.CookieUtil;
import com.jobseek.speedjobs.utils.JwtUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import java.util.Arrays;
import javax.servlet.http.Cookie;
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
	private final JwtUtil jwtUtil;
	private final RedisUtil redisUtil;
	private final CookieUtil cookieUtil;
	private final PasswordEncoder passwordEncoder;

	public TokenResponse login(TokenRequest request, HttpServletResponse response) {
		Provider provider = request.getProvider();
		User user;

		if (Provider.LOCAL.equals(provider)) {
			user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new IllegalArgumentException("해당 이메일을 갖는 유저가 존재하지 않습니다."));
			if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
				throw new IllegalArgumentException("비밀번호가 서로 일치하지 않습니다.");
			}
		} else if (Arrays.stream(Provider.values())
			.anyMatch(p -> p.name().equals(provider.name()))) {
			String oAuthId = request.getOauthId();
			user = userRepository.findByProviderAndOauthId(provider, oAuthId)
				.orElseThrow(() -> new IllegalArgumentException("해당 OAuth2 ID를 갖는 유저가 존재하지 않습니다."));
		} else {
			throw new OAuth2RegistrationException();
		}

		String accessToken = jwtUtil.createAccessToken(UserTokenDto.from(user));
		String refreshToken = jwtUtil.createRefreshToken(UserTokenDto.from(user));

		redisUtil.set(refreshToken, user.getId().toString(), jwtUtil.getRefreshValidity());

		Cookie accessCookie = cookieUtil.createCookie(jwtUtil.ACCESS_TOKEN, accessToken,
			jwtUtil.accessValidity.intValue() / 1000);

		Cookie refreshCookie = cookieUtil.createCookie(jwtUtil.REFRESH_TOKEN, refreshToken,
			jwtUtil.refreshValidity.intValue() / 1000);

		response.addCookie(accessCookie);
		response.addCookie(refreshCookie);

		return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
	}

	public void logout(HttpServletRequest request) {
		String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.delete(refreshToken)) {
			throw new InvalidTokenException();
		}
	}

  public TokenResponse reissueToken(HttpServletRequest request, HttpServletResponse response) {
    String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.hasKey(refreshToken)) {
			throw new InvalidTokenException();
		}

		UserTokenDto userTokenDto = jwtUtil.getUserTokenDto(refreshToken);
		String accessToken = jwtUtil.createAccessToken(userTokenDto);

    Cookie accessCookie = cookieUtil
        .createCookie(jwtUtil.ACCESS_TOKEN, accessToken, jwtUtil.accessValidity.intValue() / 1000);

    response.addCookie(accessCookie);

    return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
  }

}
