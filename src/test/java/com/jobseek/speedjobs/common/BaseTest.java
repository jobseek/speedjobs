package com.jobseek.speedjobs.common;

import com.jobseek.speedjobs.domain.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BaseTest {

	@Autowired
	protected PostRepository postRepository;

}
