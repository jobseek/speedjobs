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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Apply"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/apply")
public class ApplyController {

	private final ApplyService applyService;

	@ApiOperation(value = "지원한 내역 조회", notes = "이력서로 지원한 공고들을 조회한다.(개인)")
	@PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
	@GetMapping("/member/{resumeId}")
	public ResponseEntity<Page<CompanyResponse>> findRecruitByMember(@PathVariable Long resumeId,
		@LoginUser User user, Pageable pageable) {
		return ResponseEntity.ok().body(applyService.findRecruits(resumeId, user, pageable));
	}

	@ApiOperation(value = "지원된 내역 조회", notes = "공고에 지원된 이력서들을 조회한다.(기업)")
	@PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
	@GetMapping("/company/{recruitId}")
	public ResponseEntity<Page<MemberResponse>> findResumeByCompany(@PathVariable Long recruitId,
		@LoginUser User user, Pageable pageable) {
		return ResponseEntity.ok().body(applyService.findResumes(recruitId, user, pageable));
	}

}
