package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.advice.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ErrorController {

	private final TestService testService;

	@GetMapping("/test/v2")
	public ResponseEntity<String> test3() {
		return ResponseEntity.ok().body(testService.test());
	}

	@GetMapping("/testing")
	public ResponseEntity<String> test4() {
		return ResponseEntity.ok().body("안녕하세요");
	}
}
