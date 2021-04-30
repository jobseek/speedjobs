package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.advice.TestService;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ErrorController {

	private final TestService testService;
	private final UserService userService;

	@GetMapping("/test/v2")
	public ResponseEntity<String> test1() {
		return ResponseEntity.ok().body(testService.test());
	}

	@GetMapping("/test/v3/{id}")
	public ResponseEntity<User> test2(@PathVariable(value = "id") Long id) {
		return ResponseEntity.ok().body(userService.findOne(id));
	}

	@PostMapping("/test/v4")
	public ResponseEntity<Void> test3(@RequestBody UserSaveRequest request) {
//		userService.validateUserSaveRequest(request);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/testing")
	public ResponseEntity<String> test4() {
		return ResponseEntity.ok().body("안녕하세요");
	}

}
