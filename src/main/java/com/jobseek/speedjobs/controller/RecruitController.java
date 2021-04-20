package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.service.RecruitService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Recruit"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recruit")
public class RecruitController {

	private final RecruitService recruitService;

	@ApiOperation(value = "공고 등록", notes = "공고를 등록한다.")
	@PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
	@PostMapping
	public ResponseEntity<Void> saveRecruit(@LoginUser User user,
		@Valid @RequestBody RecruitRequest recruitRequest) {
		Long id = recruitService.save(recruitRequest, user);
		return ResponseEntity.created(URI.create("/api/recruit/" + id)).build();
	}

	@ApiOperation(value = "공고 삭제", notes = "공고를 삭제한다.")
	@PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
	@DeleteMapping("/{recruitId}")
	public ResponseEntity<Void> deleteRecruit(@PathVariable Long recruitId, @LoginUser User user) {
		System.out.println("서비스 = " + recruitId);
		recruitService.delete(recruitId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "공고 수정", notes = "공고를 수정한다.")
	@PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
	@PutMapping("/{recruitId}")
	public ResponseEntity<Void> updateRecruit(@PathVariable Long recruitId, @LoginUser User user,
		@Valid @RequestBody RecruitRequest recruitRequest) {
		recruitService.update(recruitId, user, recruitRequest);
		return ResponseEntity.created(URI.create("/api/recruit/" + recruitId)).build();
	}
}
