package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.jobseek.speedjobs.dto.tag.TagSaveRequest;
import com.jobseek.speedjobs.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(tags = {"Tag"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tag")
public class TagController {

	private final TagService tagService;

	@ApiOperation(value = "태그 등록", notes = "태그를 등록한다.")
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("")
	public ResponseEntity<Void> save(@Valid @RequestBody TagSaveRequest tagSaveRequest) {
		tagService.save(tagSaveRequest);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "태그 조회", notes = "태그를 조회한다.")
	@GetMapping("")
	public ResponseEntity<TagResponses> read() {
		return ResponseEntity.ok().body(tagService.readByTagType());
	}
}
