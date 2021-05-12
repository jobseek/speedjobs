package com.jobseek.speedjobs.config.auth;

import com.jobseek.speedjobs.utils.JwtUtil;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		String token = jwtUtil.getTokenFromRequest(request);

		if (token != null) {
			jwtUtil.validateToken(token);
			Authentication authentication = jwtUtil.getAuthentication(token);
			SecurityContext context = SecurityContextHolder.getContext();
			context.setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}
}
