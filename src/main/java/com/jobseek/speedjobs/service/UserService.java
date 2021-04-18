package com.jobseek.speedjobs.service;

import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobseek.speedjobs.common.exception.NotExistException;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.member.MemberUpdateRequest;
import com.jobseek.speedjobs.utils.MailUtil;
import com.jobseek.speedjobs.utils.RedisUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final RedisUtil redisUtil;
	private final MailUtil mailUtil;

	public User findById(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다. id=" + userId));
	}

	public String sendEmail(UserSaveRequest request) {
		validateUserSaveRequest(request);
		String key = UUID.randomUUID().toString();
		redisUtil.set(key, request, 30 * 60 * 1000);
		mailUtil.sendEmail(request.getEmail(), key);
		return key;
	}

	@Transactional
	public Long saveCustomUser(String key) {
		UserSaveRequest request = (UserSaveRequest)redisUtil.get(key)
			.orElseThrow(() -> new NotExistException("이미 처리된 요청이거나 시간초과되었습니다."));
		redisUtil.delete(key);
		User user = request.toEntity(passwordEncoder);
		return userRepository.save(user).getId();
	}

	private void validateUserSaveRequest(UserSaveRequest request) {
		final String nameReg = "^[a-zA-Z가-힣]{2,15}$";
		final String emailReg = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
		final String passwordReg = "^[a-zA-Z0-9_\\-!#$%.]{8,20}$";

		if (!Pattern.matches(nameReg, request.getName()) ||
			!Pattern.matches(emailReg, request.getEmail()) ||
			!Pattern.matches(passwordReg, request.getPassword())) {
			throw new IllegalArgumentException("회원가입 형식에 맞지 않습니다.");
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
		}
	}

	@Transactional
	public void update(Long id, MemberUpdateRequest request) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("없는 유저입니다."));
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPicture(request.getPicture());
		user.setContact(request.getContact());
		Member member = user.getMember();
		member.setSex(request.getSex());
		member.setBirth(request.getBirth());
		member.setNickname(request.getNickname());
		member.setIntro(request.getIntro());
	}

}
