package com.jobseek.speedjobs.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class PostServiceTest {

	@Autowired
	private PostService postService;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Test
	public void save() {
	}

}
