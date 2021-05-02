package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class PostServiceTest {

	@Autowired
	PostService postService;

	@Autowired
	MemberRepository memberRepository;
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;


}
