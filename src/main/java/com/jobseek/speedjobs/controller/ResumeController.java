package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import com.jobseek.speedjobs.dto.resume.ResumeSearchCondition;
import com.jobseek.speedjobs.service.ResumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Resume"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
public class ResumeController {

	private final ResumeService resumeService;

	@ApiOperation(value = "이력서 등록", notes = "이력서를 등록한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping
	public ResponseEntity<Void> save(@Valid @RequestBody ResumeRequest resumeRequest,
		@LoginUser User user) {
		Long id = resumeService.save(user, resumeRequest);
		return ResponseEntity.created(URI.create("/api/resume/" + id)).build();
	}

	@ApiOperation(value = "이력서 수정", notes = "이력서를 수정한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PutMapping("/{resumeId}")
	public ResponseEntity<Void> update(@PathVariable Long resumeId, @LoginUser User user,
		@Valid @RequestBody ResumeRequest resumeRequest) {
		resumeService.update(resumeId, user, resumeRequest);
		return ResponseEntity.created(URI.create("/api/resume/" + resumeId)).build();
	}

	@ApiOperation(value = "이력서 삭제", notes = "이력서를 삭제한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@DeleteMapping("/{resumeId}")
	public ResponseEntity<Void> delete(@PathVariable Long resumeId, @LoginUser User user) {
		resumeService.delete(resumeId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "이력서 단건 조회", notes = "이력서를 조회한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY', 'ADMIN')")
	@GetMapping("/{resumeId}")
	public ResponseEntity<ResumeResponse> findResume(@PathVariable Long resumeId) {
		return ResponseEntity.ok().body(resumeService.findById(resumeId));
	}

	@ApiOperation(value = "이력서 전체 조회", notes = "이력서를 전체 조회한다")
	@PreAuthorize("hasAnyRole('MEMBER', 'ADMIN')")
	@GetMapping
	public ResponseEntity<Page<ResumeResponse>> findAll(Pageable pageable,
		ResumeSearchCondition condition, @LoginUser User user) {
		return ResponseEntity.ok().body(resumeService.findAll(condition, pageable, user));
	}
}
