package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.config.auth.exception.InvalidTokenException;
import com.jobseek.speedjobs.config.auth.exception.OAuth2NotFoundException;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.domain.user.exception.WrongPasswordException;
import com.jobseek.speedjobs.dto.auth.LocalLoginRequest;
import com.jobseek.speedjobs.dto.auth.SocialLoginRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.dto.user.UserTokenDto;
import com.jobseek.speedjobs.util.JwtUtil;
import com.jobseek.speedjobs.util.RedisUtil;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final UserRepository userRepository;
	private final MemberRepository memberRepository;
	private final JwtUtil jwtUtil;
	private final RedisUtil redisUtil;
	private final PasswordEncoder passwordEncoder;

	public TokenResponse localLogin(LocalLoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new NotFoundException("해당 이메일을 갖는 유저가 존재하지 않습니다."));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new WrongPasswordException("비밀번호가 서로 일치하지 않습니다.");
		}

		return issueTokens(user);
	}

	public TokenResponse socialLogin(SocialLoginRequest request) {
		Provider provider = request.getProvider();
		String oauthId = request.getOauthId();
		User user = memberRepository.findByProviderAndOauthId(provider, oauthId)
			.orElseThrow(() -> new OAuth2NotFoundException("해당 OAuth2 ID를 갖는 유저가 존재하지 않습니다."));
		return issueTokens(user);
	}

	public void logout(HttpServletRequest request) {
		String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.delete(refreshToken)) {
			throw new InvalidTokenException("유효하지 않은 토큰입니다.");
		}
	}

	public TokenResponse reissueToken(HttpServletRequest request) {
		String refreshToken = jwtUtil.getTokenFromRequest(request);

		if (!jwtUtil.isRefreshToken(refreshToken) || !redisUtil.hasKey(refreshToken)) {
			throw new InvalidTokenException("유효하지 않은 토큰입니다.");
		}

		UserTokenDto userTokenDto = jwtUtil.getUserTokenDto(refreshToken);
		String accessToken = jwtUtil.createAccessToken(userTokenDto);

		return TokenResponse.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	private TokenResponse issueTokens(User user) {
		String accessToken = jwtUtil.createAccessToken(UserTokenDto.from(user));
		String refreshToken = jwtUtil.createRefreshToken(UserTokenDto.from(user));

		redisUtil.set(refreshToken, user.getId().toString(), jwtUtil.getRefreshValidity());

		return TokenResponse.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}
}
