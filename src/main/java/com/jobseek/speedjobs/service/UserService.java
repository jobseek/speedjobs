package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotExistException;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.utils.MailUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import java.util.UUID;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final RedisUtil redisUtil;
	private final MailUtil mailUtil;

	public User findById(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다. id=" + userId));
	}

	public Boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	public void sendEmail(UserSaveRequest request) {
		log.info("request - {}", request);
		validateUserSaveRequest(request);
		String key = UUID.randomUUID().toString();
		redisUtil.set(key, request, 30 * 60 * 1000);
		mailUtil.sendEmail(request.getEmail(), key);
	}

	@Transactional
	public Long saveUser(String key) {
		UserSaveRequest request = (UserSaveRequest) redisUtil.get(key);
		if (request == null) {
			throw new NotExistException("이미 처리된 요청이거나 시간초과되었습니다.");
		}
		User user = User.createCustomUser(request, passwordEncoder);
		redisUtil.delete(key);
		return userRepository.save(user).getId();
	}

	private void validateUserSaveRequest(UserSaveRequest request) {
		if (request.getRole() != Role.ROLE_MEMBER && request.getRole() != Role.ROLE_COMPANY) {
			throw new IllegalArgumentException("올바르지 않는 요청입니다.");
		}
		String nameReg = "^[a-zA-Z가-힣]{2,15}$";
		String emailReg = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
		String passwordReg = "^[a-zA-Z0-9_\\-!#$%.]{8,20}$";

		if (Pattern.matches(nameReg, request.getName()) &&
			Pattern.matches(emailReg, request.getEmail()) &&
			Pattern.matches(passwordReg, request.getPassword())) {
			return;
		}
		throw new IllegalArgumentException("조건에 맞지 않습니다.");
	}

}
