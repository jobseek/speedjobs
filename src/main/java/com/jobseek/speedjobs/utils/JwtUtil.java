package com.jobseek.speedjobs.utils;

import com.jobseek.speedjobs.config.auth.exception.ExpiredTokenException;
import com.jobseek.speedjobs.config.auth.exception.InvalidTokenException;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.dto.user.UserTokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {

	public final String ACCESS_TOKEN = "ACCESS_TOKEN";
	public final String REFRESH_TOKEN = "REFRESH_TOKEN";
	public final Long accessValidity;
	public final Long refreshValidity;
	private final String secretKey;

	public JwtUtil(
		@Value("${jwt.secret-key}") String secretKey,
		@Value("${jwt.access-validity-in-ms}") Long accessValidity,
		@Value("${jwt.refresh-validity-in-ms}") Long refreshValidity
	) {
		this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
		this.accessValidity = accessValidity;
		this.refreshValidity = refreshValidity;
	}

	public String createAccessToken(UserTokenDto userTokenDto) {
		return createToken(userTokenDto, ACCESS_TOKEN, accessValidity);
	}

	public String createRefreshToken(UserTokenDto userTokenDto) {
		return createToken(userTokenDto, REFRESH_TOKEN, refreshValidity);
	}

	private String createToken(UserTokenDto userTokenDto, String tokenType, Long validity) {
		Claims claims = Jwts.claims();
		claims.put("tokenType", tokenType);
		claims.put("userId", userTokenDto.getId().toString());
		claims.put("role", userTokenDto.getRole());

		Date now = new Date();
		Date expiration = new Date(now.getTime() + validity);

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(expiration)
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
	}

	private Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	public UserTokenDto getUserTokenDto(String token) {
		Claims claims = getClaims(token);
		return UserTokenDto.builder()
			.id(Long.valueOf(claims.get("userId", String.class)))
			.role(Role.valueOf(claims.get("role", String.class)))
			.build();
	}

	public Authentication getAuthentication(String token) {
		UserTokenDto userTokenDto = getUserTokenDto(token);
		return new UsernamePasswordAuthenticationToken(userTokenDto.getId(), null,
			Collections.singleton(new SimpleGrantedAuthority(userTokenDto.getRole().toString())));
	}

	public String getTokenFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		return token == null ? null : token.substring("Bearer ".length());
	}

	public void validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
			throw new InvalidTokenException("유효하지 않은 토큰입니다.");
		} catch (ExpiredJwtException e) {
			throw new ExpiredTokenException("이미 만료된 토큰입니다.");
		}
	}

	public Long getRefreshValidity() {
		return refreshValidity;
	}

	public boolean isRefreshToken(String token) {
		return getClaims(token).get("tokenType").equals(REFRESH_TOKEN);
	}
}
