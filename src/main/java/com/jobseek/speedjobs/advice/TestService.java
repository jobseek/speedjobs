package com.jobseek.speedjobs.advice;

import com.jobseek.speedjobs.domain.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService {

	private final TagRepository tagRepository;

	public String test() {
//		Long id = 99L;
//		Tag tag = tagRepository.findById(id).orElseThrow(() -> new testException());
		throw new TestException();
	}
}
