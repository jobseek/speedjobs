package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.recruit.RecruitListResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitRequest;
import com.jobseek.speedjobs.dto.recruit.RecruitResponse;
import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import com.jobseek.speedjobs.service.RecruitService;
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

@Api(tags = {"Recruit"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recruit")
public class RecruitController {

	private final RecruitService recruitService;

	@ApiOperation(value = "공고 등록", notes = "공고를 등록한다.")
	@PreAuthorize("hasRole('COMPANY')")
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

	@ApiOperation(value = "공고 단건 조회", notes = "공고를 조회한다.")
	@GetMapping("/{recruitId}")
	public ResponseEntity<RecruitResponse> findRecruit(@PathVariable Long recruitId,
		@LoginUser User user) {
		return ResponseEntity.ok().body(recruitService.findById(recruitId, user));
	}

	@ApiOperation(value = "공고 전체 조회", notes = "공고를 전체 조회한다")
	@GetMapping
	public ResponseEntity<Page<RecruitResponse>> findAll(Pageable pageable, @LoginUser User user,
		RecruitSearchCondition condition) {
		return ResponseEntity.ok().body(recruitService.findAll(condition, pageable, user));
	}

	/**
	 * 찜하기
	 */
	@ApiOperation(value = "공고 찜하기", notes = "공고를 찜한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@PostMapping("/{recruitId}/favorite")
	public ResponseEntity<Void> saveRecruitFavorite(@PathVariable Long recruitId,
		@LoginUser User user) {
		recruitService.saveRecruitFavorite(recruitId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "공고 찜하기 취소", notes = "공고를 찜목록에서 삭제한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@DeleteMapping("/{recruitId}/favorite")
	public ResponseEntity<Void> deleteRecruitFavorite(@PathVariable Long recruitId,
		@LoginUser User user) {
		recruitService.deleteRecruitFavorite(recruitId, user);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "공고 찜 목록 조회하기", notes = "공고 찜 목록을 조회한다.")
	@PreAuthorize("hasAnyRole('MEMBER', 'COMPANY')")
	@GetMapping("/favorites")
	public ResponseEntity<Page<RecruitListResponse>> findRecruitFavorites(@LoginUser User user,
		Pageable pageable) {
		return ResponseEntity.ok().body(recruitService.findRecruitFavorites(pageable, user));
	}
}
