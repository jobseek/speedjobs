package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.common.exception.NotExistException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.UserCheckRequest;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.company.CompanyInfoResponse;
import com.jobseek.speedjobs.dto.user.member.MemberInfoResponse;
import com.jobseek.speedjobs.dto.user.member.MemberUpdateRequest;
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
@Transactional(readOnly = true)
@Service
public class UserService {

	private final UserRepository userRepository;
	private final MemberRepository memberRepository;
	private final CompanyRepository companyRepository;
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
		System.out.println("UUIDkey = " + key);
		redisUtil.set(key, request, 30 * 60 * 1000);
		mailUtil.sendEmail(request.getEmail(), key);
		return key;
	}

	@Transactional
	public Long saveCustomUser(String key) {
		UserSaveRequest request = (UserSaveRequest) redisUtil.get(key)
			.orElseThrow(() -> new NotExistException("이미 처리된 요청이거나 시간초과되었습니다."));
		redisUtil.delete(key);
		UserDto userDto = request.getUserDto(passwordEncoder);
		if (userDto.getRole() == Role.ROLE_MEMBER) {
			userDto.setNickname(request.getName());
			Member member = new Member(userDto);
			return memberRepository.save(member).getId();
		} else if (userDto.getRole() == Role.ROLE_COMPANY) {
			Company company = new Company(userDto);
			return companyRepository.save(company).getId();
		} else {
			throw new IllegalArgumentException("존재하지 않는 역할입니다.");
		}
	}

	private void validateUserSaveRequest(UserSaveRequest request) {
		final String nameReg = "^[a-zA-Z가-힣]{2,15}$";
		final String emailReg = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
		final String passwordReg = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$";
		final String contactReg = "^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$";
		final String companyNameReg = "^[a-zA-Z가-힣]{2,30}$";
		final String homepageReg = "^(http|https)://[a-zA-Z0-9\\-.]+\\.[a-zA-Z]{2,6}(/\\S*)?$";
		final String registrationNumReg = "^[0-9]{3}-[0-9]{2}-[0-9]{5}$";

		if (!Pattern.matches(nameReg, request.getName()) ||
			!Pattern.matches(emailReg, request.getEmail()) ||
			!Pattern.matches(passwordReg, request.getPassword())) {
			throw new IllegalArgumentException("회원가입 형식에 맞지 않습니다.");
		}

		if (request.getRole() == Role.ROLE_COMPANY) {
			if (!Pattern.matches(contactReg, request.getContact()) ||
				!Pattern.matches(companyNameReg, request.getCompanyName()) ||
				!Pattern.matches(homepageReg, request.getHomepage()) ||
				!Pattern.matches(registrationNumReg, request.getRegistrationNumber())
			) {
				throw new IllegalArgumentException("회원가입 형식에 맞지 않습니다.");
			}
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
		}
	}

	public void validateUserCheckRequest(UserCheckRequest request, User user) {
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
		}
	}

	public MemberInfoResponse getMemberInfo(Long userId, User user) {
		if (user.getRole() != Role.ROLE_MEMBER) {
			throw new IllegalArgumentException("개인회원이 아닙니다.");
		} else if (!userId.equals(user.getId())) {
			throw new IllegalArgumentException("본인만 수정할 수 있습니다.");
		}
		Member member = memberRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("개인회원이 아닙니다."));
		return MemberInfoResponse.of(member);
	}

	public CompanyInfoResponse getCompanyInfo(Long userId, User user) {
		if (user.getRole() != Role.ROLE_COMPANY) {
			throw new IllegalArgumentException("기업회원이 아닙니다.");
		} else if (!userId.equals(user.getId())) {
			throw new IllegalArgumentException("본인만 수정할 수 있습니다.");
		}
		Company company = companyRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("기업회원이 아닙니다."));
		return CompanyInfoResponse.of(company);
	}

	@Transactional
	public void update(Long userId, MemberUpdateRequest request) {
		memberRepository.findById(userId)
			.map(member -> member.updateCustomMemberInfo(request.getName(), request.getNickname(), request.getPassword(),
					request.getPicture(), request.getContact(), request.getBirth(),
					request.getBio(), request.getGender()))
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
	}

	@Transactional
	public void delete(Long userId) {
		User user = findById(userId);
		userRepository.delete(user);
	}

}
