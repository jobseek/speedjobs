package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.user.UserCheckRequest;
import com.jobseek.speedjobs.dto.user.UserInfoResponse;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.UserValidateGroup;
import com.jobseek.speedjobs.dto.user.company.CompanyInfoResponse;
import com.jobseek.speedjobs.dto.user.company.CompanyUpdateRequest;
import com.jobseek.speedjobs.dto.user.member.MemberInfoResponse;
import com.jobseek.speedjobs.dto.user.member.MemberUpdateRequest;
import com.jobseek.speedjobs.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(tags = {"User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	@ApiOperation(value = "개인회원가입(이메일 인증 전)", notes = "정상적으로 처리되면 인증 이메일이 발송된다.")
	@PostMapping("/signup/member")
	public ResponseEntity<Void> sendMemberEmail(
		@Validated(UserValidateGroup.member.class) @RequestBody UserSaveRequest userSaveRequest) {
		userService.sendEmail(userSaveRequest);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "기업회원가입(이메일 인증 전)", notes = "정상적으로 처리되면 인증 이메일이 발송된다.")
	@PostMapping("/signup/company")
	public ResponseEntity<Void> sendCompanyEmail(
		@Valid @RequestBody UserSaveRequest userSaveRequest) {
		userService.sendEmail(userSaveRequest);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "회원가입(이메일 인증 후)", notes = "수신 이메일의 링크를 클릭하면 회원가입이 정상적으로 완료된다.")
	@GetMapping("/signup/confirm/{key}")
	public void saveCustomUser(@PathVariable String key,
		HttpServletResponse response) throws IOException {
		userService.saveCustomUser(key);
		response.sendRedirect("http://localhost:3000");
	}

	@ApiOperation(value = "회원 정보 조회", notes = "로그인된 회원의 정보를 조회한다.")
	@GetMapping("/me")
	public ResponseEntity<UserInfoResponse> findLoginUserInfo(@LoginUser User user) {
		return ResponseEntity.ok(UserInfoResponse.of(user));
	}

	@ApiOperation(value = "회원 비밀번호 확인", notes = "로그인된 회원의 비밀번호를 확인한다.")
	@PostMapping("/check")
	public ResponseEntity<Void> checkLoginUserPassword(
		@Valid @RequestBody UserCheckRequest userCheckRequest,
		@LoginUser User user) {
		userService.validateUserCheckRequest(userCheckRequest, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "개인회원 상세정보 조회", notes = "개인회원의 상세정보를 조회한다.")
	@GetMapping("/member/{userId}")
	public ResponseEntity<MemberInfoResponse> findMemberDetail(@PathVariable Long userId,
		@LoginUser User user) {
		return ResponseEntity.ok(userService.findMemberInfo(userId, user));
	}

	@ApiOperation(value = "기업회원 상세정보 조회", notes = "기업회원의 상세정보를 조회한다.")
	@GetMapping("/company/{userId}")
	public ResponseEntity<CompanyInfoResponse> findCompanyDetail(@PathVariable Long userId,
		@LoginUser User user) {
		return ResponseEntity.ok(userService.findCompanyInfo(userId, user));
	}

	@ApiOperation(value = "개인회원 정보 수정", notes = "자신의 정보를 수정한다.")
	@PatchMapping("/member/{userId}")
	@PreAuthorize("hasRole('MEMBER')")
	public ResponseEntity<Void> updateMemberInfo(@PathVariable Long userId,
		@RequestBody MemberUpdateRequest memberUpdateRequest) {
		userService.updateMemberInfo(userId, memberUpdateRequest);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "기업회원 정보 수정", notes = "자신의 정보를 수정한다.")
	@PatchMapping("/company/{userId}")
	@PreAuthorize("hasRole('COMPANY')")
	public ResponseEntity<Void> updateCompanyInfo(@PathVariable Long userId,
		@RequestBody CompanyUpdateRequest companyUpdateRequest) {
		userService.updateCompanyInfo(userId, companyUpdateRequest);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "회원 탈퇴", notes = "탈퇴한다.")
	@DeleteMapping("/{userId}")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	public ResponseEntity<Void> deleteUser(@PathVariable Long userId,
		@Valid @RequestBody UserCheckRequest userCheckRequest, @LoginUser User user) {
		userService.delete(userCheckRequest, userId, user);
		return ResponseEntity.noContent().build();
	}

}
