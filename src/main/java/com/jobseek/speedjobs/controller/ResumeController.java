package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.dto.resume.ResumeResponse;
import com.jobseek.speedjobs.service.ResumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
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

	@ApiOperation(value = "이력서 추가", notes = "이력서를 등록한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping
	public ResponseEntity<Void> save(@LoginUser User user,
		@RequestBody ResumeRequest resumeRequest) {
		Long id = resumeService.save(user, resumeRequest);
		return ResponseEntity.created(URI.create("/api/resume/" + id)).build();
	}

	@ApiOperation(value = "이력서 수정", notes = "이력서를 수정한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PutMapping("/{resumeId}")
	public ResponseEntity<Void> update(@PathVariable Long resumeId, @LoginUser User user,
		@RequestBody ResumeRequest resumeRequest) {
		resumeService.update(resumeId, user, resumeRequest);
		return ResponseEntity.created(URI.create("/api/resume/" + resumeId)).build();
	}

	@ApiOperation(value = "이력서 삭제", notes = "이력서를 삭제한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@DeleteMapping("/{resumeId}")
	public ResponseEntity<Void> delete(@PathVariable Long resumeId) {
		resumeService.delete(resumeId);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "이력서 단건 조회", notes = "이력서를 조회한다.")
	@GetMapping("/{resumeId}")
	public ResponseEntity<ResumeResponse> readResume(@PathVariable Long resumeId) {
		return ResponseEntity.ok().body(resumeService.readById(resumeId));
	}

	@ApiOperation(value = "이력서 전체 조회", notes = "이력서를 전체 조회한다")
	@GetMapping
	public ResponseEntity<List<ResumeResponse>> readAllResumes() {
		return ResponseEntity.ok().body(resumeService.readAll());
	}

}
