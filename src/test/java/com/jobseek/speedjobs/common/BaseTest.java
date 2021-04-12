package com.jobseek.speedjobs.common;

import com.jobseek.speedjobs.domain.post.PostRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
public class BaseTest {

	@Autowired
	protected PostRepository postRepository;

}
