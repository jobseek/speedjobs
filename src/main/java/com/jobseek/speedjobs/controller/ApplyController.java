package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.apply.CompanyResponse;
import com.jobseek.speedjobs.dto.apply.MemberResponse;
import com.jobseek.speedjobs.service.ApplyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Apply"})
@RequiredArgsConstructor
@RestController
public class ApplyController {

	private final ApplyService applyService;

	@ApiOperation(value = "지원한 내역 조회", notes = "이력서로 지원한 공고들을 조회한다.(개인)")
	@PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
	@GetMapping("/api/apply/member/{resumeId}")
	public ResponseEntity<Page<CompanyResponse>> findRecruitByMember(@PathVariable Long resumeId,
		@LoginUser User user, Pageable pageable) {
		return ResponseEntity.ok().body(applyService.findAppliedRecruits(resumeId, user, pageable));
	}

	@ApiOperation(value = "지원된 내역 조회", notes = "공고에 지원된 이력서들을 조회한다.(기업)")
	@PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
	@GetMapping("/api/apply/company/{recruitId}")
	public ResponseEntity<Page<MemberResponse>> findResumeByCompany(@PathVariable Long recruitId,
		@LoginUser User user, Pageable pageable) {
		return ResponseEntity.ok().body(applyService.findAppliedResumes(recruitId, user, pageable));
	}

	@ApiOperation(value = "공고 지원", notes = "해당 이력서로 공고에 지원한다")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping("/api/recruit/{recruitId}/resume/{resumeId}")
	public ResponseEntity<Void> apply(@PathVariable Long recruitId, @PathVariable Long resumeId,
		@LoginUser User user) {
		applyService.save(recruitId, resumeId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "공고 지원 취소", notes = "지원을 취소한다")
	@PreAuthorize("hasRole('MEMBER')")
	@DeleteMapping("/api/recruit/{recruitId}/resume")
	public ResponseEntity<Void> cancel(@PathVariable Long recruitId, @LoginUser User user) {
		applyService.delete(recruitId, user);
		return ResponseEntity.noContent().build();
	}
}
