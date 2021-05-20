package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.jobseek.speedjobs.domain.recruit.RecruitQueryRepository;
import com.jobseek.speedjobs.domain.recruit.RecruitRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RecruitServiceTest {

	@Mock
	RecruitRepository recruitRepository;

	@Mock
	RecruitQueryRepository recruitQueryRepository;

	@Mock
	TagService tagService;

	@Mock
	UserService userService;

	RecruitService recruitService;

	@BeforeEach
	void setUp() {
		recruitService = new RecruitService(recruitRepository, recruitQueryRepository, tagService,
			userService);
	}

	@DisplayName("서비스 생성 테스트")
	@Test
	void createService() {
		assertNotNull(recruitService);
	}


}
