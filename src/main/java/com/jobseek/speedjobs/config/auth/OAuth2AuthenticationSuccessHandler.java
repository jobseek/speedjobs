package com.jobseek.speedjobs.config.auth;

import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.dto.auth.TokenRequest;
import com.jobseek.speedjobs.service.AuthService;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final AuthService authService;

	@Value("${front-url}")
	private String frontUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		String[] path = request.getRequestURI().split("/");
		Provider provider = Provider.valueOf(path[path.length - 1].toUpperCase());
		String oauthId = authentication.getName();
		TokenRequest tokenRequest = TokenRequest.builder()
			.oauthId(oauthId)
			.provider(provider)
			.build();
		authService.login(tokenRequest, response);
		response.sendRedirect(frontUrl);
	}
}
