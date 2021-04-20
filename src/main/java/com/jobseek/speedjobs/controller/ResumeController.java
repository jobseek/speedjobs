package com.jobseek.speedjobs.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeRequest;
import com.jobseek.speedjobs.service.ResumeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"Resume"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
public class ResumeController {

	private final ResumeService resumeService;

	@ApiOperation(value = "이력서 추가", notes = "이력서를 등록한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PostMapping()
	public ResponseEntity<Void> save(@LoginUser User user,
		@Valid @RequestBody ResumeRequest request) {
		Long id = resumeService.save(user, request);
		return ResponseEntity.created(URI.create("/api/resume/" + id)).build();
	}

	@ApiOperation(value = "이력서 수정", notes = "이력서를 수정한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@PutMapping("/{id}")
	public ResponseEntity<Void> update(@PathVariable("id") Long id) {
		resumeService.update(id);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "이력서 삭제", notes = "이력서를 삭제한다.")
	@PreAuthorize("hasRole('MEMBER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
		System.out.println("컨트롤러");
		resumeService.delete(id);
		return ResponseEntity.noContent().build();
	}


}
