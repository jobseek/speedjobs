package com.jobseek.speedjobs.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.jobseek.speedjobs.config.auth.CustomAccessDeniedHandler;
import com.jobseek.speedjobs.config.auth.CustomAuthenticationEntryPoint;
import com.jobseek.speedjobs.config.auth.JwtAuthenticationFilter;
import com.jobseek.speedjobs.config.auth.CustomOAuth2UserService;
import com.jobseek.speedjobs.config.auth.OAuth2AuthenticationFailureHandler;
import com.jobseek.speedjobs.config.auth.OAuth2AuthenticationSuccessHandler;
import com.jobseek.speedjobs.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CustomOAuth2UserService customOAuth2UserService;
	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
	private final JwtUtil jwtUtil;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.httpBasic()
				.disable()
			.csrf()
				.disable()
			.cors()
				.and()
			.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
			.authorizeRequests()
				.antMatchers("/api/auth/**", "/api/tag", "/api/user/**",
					"/api/recruit/**", "/api/post/**", "/chat/**", "/api/chat/**")
					.permitAll()
				.anyRequest()
					.authenticated()
				.and()
			.exceptionHandling()
				.authenticationEntryPoint(customAuthenticationEntryPoint)
				.accessDeniedHandler(customAccessDeniedHandler)
				.and()
			.oauth2Login()
				.userInfoEndpoint()
					.userService(customOAuth2UserService)
					.and()
				.successHandler(oAuth2AuthenticationSuccessHandler)
				.failureHandler(oAuth2AuthenticationFailureHandler);

		http.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	public void configure(WebSecurity web) {
		web
			.ignoring()
			.antMatchers("/v2/api-docs", "/swagger-resources/**",
			"/swagger-ui.html", "/webjars/**", "/swagger/**");
		web
			.ignoring()
			.antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/img/**", "/icon/**");
	}

}
