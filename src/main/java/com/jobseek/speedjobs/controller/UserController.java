package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.user.CompanyUpdateRequest;
import com.jobseek.speedjobs.dto.user.LoginUserResponse;
import com.jobseek.speedjobs.dto.user.MemberUpdateRequest;
import com.jobseek.speedjobs.dto.user.UserCheckRequest;
import com.jobseek.speedjobs.dto.user.UserInfoResponse;
import com.jobseek.speedjobs.dto.user.UserListResponse;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.UserSearchCondition;
import com.jobseek.speedjobs.dto.user.UserValidateGroup;
import com.jobseek.speedjobs.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

@Api(tags = {"User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	@Value("${front-url}")
	String frontUrl;

	@ApiOperation(value = "개인 회원가입(이메일 인증 전)", notes = "정상적으로 처리되면 인증 이메일이 발송된다.")
	@PostMapping("/signup/member")
	public ResponseEntity<Void> registerMember(
		@Validated(UserValidateGroup.member.class) @RequestBody UserSaveRequest request) {
		userService.register(request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "기업 회원가입 신청(이메일 인증 및 관리자 승인 전)",
		notes = "인증 이메일이 발송되고 관리자의 승인 전까진 기업회원으로 활동할 수 없다.")
	@PostMapping("/signup/company")
	public ResponseEntity<Void> sendCompanyEmail(
		@Valid @RequestBody UserSaveRequest request) {
		userService.register(request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "이메일 인증", notes = "수신 이메일의 링크를 클릭하면 회원가입이 정상적으로 완료된다.")
	@GetMapping("/signup/confirm/{key}")
	public void saveCustomUser(@PathVariable String key, HttpServletResponse response)
		throws IOException {
		userService.save(key);
		response.sendRedirect(frontUrl);
	}

	@ApiOperation(value = "기업 회원가입 승인", notes = "정상적으로 처리되면 기업회원으로 활동할 수 있다.")
	@PreAuthorize("hasRole('ADMIN')")
	@PatchMapping("/signup/company/{userId}")
	public ResponseEntity<Void> approveRegistration(@PathVariable Long userId) {
		userService.approveCompany(userId);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "로그인 회원 정보 조회", notes = "로그인된 회원의 정보를 조회한다.")
	@GetMapping("/me")
	public ResponseEntity<LoginUserResponse> findLoginUserInfo(@LoginUser User user) {
		return ResponseEntity.ok(LoginUserResponse.of(user));
	}

	@ApiOperation(value = "회원 상세정보 조회", notes = "회원의 상세정보를 조회한다.")
	@PreAuthorize("hasRole('ADMIN') or principal == #userId")
	@GetMapping("/{userId}")
	public ResponseEntity<UserInfoResponse> findUserInfo(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.findOne(userId));
	}

	@ApiOperation(value = "개인회원 정보 수정", notes = "자신의 정보를 수정한다.")
	@PreAuthorize("principal == #userId")
	@PatchMapping("/member/{userId}")
	public ResponseEntity<Void> updateMemberInfo(@PathVariable Long userId,
		@Valid @RequestBody MemberUpdateRequest request) {
		userService.updateMemberInfo(userId, request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "기업회원 정보 수정", notes = "자신의 정보를 수정한다.")
	@PreAuthorize("principal == #userId")
	@PatchMapping("/company/{userId}")
	public ResponseEntity<Void> updateCompanyInfo(@PathVariable Long userId,
		@Valid @RequestBody CompanyUpdateRequest request) {
		userService.updateCompanyInfo(userId, request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "회원 탈퇴", notes = "탈퇴한다.")
	@PreAuthorize("hasRole('ADMIN') or principal == #userId")
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long userId,
		@Valid @RequestBody UserCheckRequest request, @LoginUser User user) {
		userService.delete(request, userId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "회원 전체 조회", notes = "모든 회원을 조회한다.")
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<Page<UserListResponse>> findAll(Pageable pageable,
		UserSearchCondition condition) {
		return ResponseEntity.ok().body(userService.findAll(condition, pageable));
	}
}
