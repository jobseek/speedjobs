package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.common.file.dto.File;
import com.jobseek.speedjobs.dto.banner.BannerResponses;
import com.jobseek.speedjobs.service.BannerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Banner"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/banner")
public class BannerController {

	private final BannerService bannerService;

	@ApiOperation(value = "배너 등록", notes = "배너를 등록한다.")
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<BannerResponses> save(@Valid @RequestBody List<File> files) {
		return ResponseEntity.ok().body(bannerService.save(files));
	}

	@ApiOperation(value = "배너 조회", notes = "배너를 조회한다.")
	@GetMapping
	public ResponseEntity<BannerResponses> find() {
		return ResponseEntity.ok().body(bannerService.findAll());
	}

	@ApiOperation(value = "배너 삭제", notes = "배너를 삭제한다.")
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		bannerService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
