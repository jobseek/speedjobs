package com.jobseek.speedjobs.config.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.jobseek.speedjobs.dto.auth.TokenRequest;
import com.jobseek.speedjobs.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	private AuthService authService;

	@Autowired
	public OAuth2AuthenticationSuccessHandler(@Lazy AuthService authService) {
		this.authService = authService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		String email = (String)oAuth2User.getAttributes().get("email");
		TokenRequest tokenRequest = TokenRequest.builder().email(email).build();
		authService.login(tokenRequest, response);
		redirectStrategy.sendRedirect(request, response, "http://localhost:3000/");
	}
}
