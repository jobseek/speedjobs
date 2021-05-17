package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;

@ExtendWith(MockitoExtension.class)
class RecruitServiceTest {

	@MockBean
	RecruitRepository recruitRepository;
	@MockBean
	RecruitQueryRepository recruitQueryRepository;
	@MockBean
	TagService tagService;
	@MockBean
	UserService userService;
	private RecruitService recruitService;

	@BeforeEach
	void setUp() {
		recruitService = new RecruitService(recruitRepository, recruitQueryRepository, tagService, userService);
	}

	@Test
	public void test() {
		recruitService.findOne(1L);
	}

}
