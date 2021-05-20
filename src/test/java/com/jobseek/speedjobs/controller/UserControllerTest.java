package com.jobseek.speedjobs.controller;

import com.jobseek.speedjobs.config.auth.LoginUserArgumentResolver;
import com.jobseek.speedjobs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest(UserController.class)
class UserControllerTest {

	public static final String AUTH_HEADER = "Authorization";

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@MockBean
	private LoginUserArgumentResolver loginUserArgumentResolver;

	@MockBean
	private UserService userService;

}
