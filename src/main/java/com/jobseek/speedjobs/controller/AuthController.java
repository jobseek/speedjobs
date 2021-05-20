package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.dto.auth.TokenRequest;
import com.jobseek.speedjobs.dto.auth.TokenResponse;
import com.jobseek.speedjobs.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Authentication"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	@ApiOperation(value = "로그인")
	@PostMapping("/login")
	public ResponseEntity<TokenResponse> login(@Valid @RequestBody TokenRequest tokenRequest,
		HttpServletResponse response) {
		return ResponseEntity.ok(authService.login(tokenRequest, response));
	}

	@ApiOperation(value = "로그아웃")
	@GetMapping("/logout")
	public ResponseEntity<Void> logout(HttpServletRequest request) {
		authService.logout(request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "토큰 재발급", notes = "액세스 토큰이 만료되면 리프레시 토큰을 통해 재발급이 가능하다.")
	@GetMapping("/reissue")
	public ResponseEntity<TokenResponse> reissueToken(HttpServletRequest request,
		HttpServletResponse response) {
		return ResponseEntity.ok(authService.reissueToken(request, response));
	}

}
