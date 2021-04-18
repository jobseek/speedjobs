package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.*;

import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.utils.MailUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  private UserService userService;
  @Mock
  private PasswordEncoder passwordEncoder;
  @Mock
  private RedisUtil redisUtil;
  @Mock
  private MailUtil mailUtil;


  @Mock
  private UserRepository userRepository;

  private User user;

  @BeforeEach
  void 셋업(){
    userService = new UserService(userRepository,passwordEncoder,redisUtil,mailUtil);

    user = User.builder().name("Test_NAME").
  }

}