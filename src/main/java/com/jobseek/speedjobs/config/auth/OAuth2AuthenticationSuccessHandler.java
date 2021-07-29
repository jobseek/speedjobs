package com.jobseek.speedjobs.config.auth;

import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.dto.auth.SocialLoginRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.service.AuthService;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final AuthService authService;

	@Value("${front-url}")
	private String frontUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
		HttpServletResponse httpServletResponse,
		Authentication authentication) throws IOException {
		String[] path = httpServletRequest.getRequestURI().split("/");
		Provider provider = Provider.valueOf(path[path.length - 1].toUpperCase());
		String oauthId = authentication.getName();
		SocialLoginRequest request = SocialLoginRequest.builder()
			.oauthId(oauthId)
			.provider(provider)
			.build();
		TokenResponse response = authService.socialLogin(request);
		String uri = UriComponentsBuilder.fromUriString(frontUrl + "/login")
			.queryParam("token", response.getRefreshToken())
			.build()
			.toUriString();
		httpServletResponse.sendRedirect(uri);
	}
}
