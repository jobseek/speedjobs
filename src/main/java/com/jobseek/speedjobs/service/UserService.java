package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;
import com.jobseek.speedjobs.domain.user.UserQueryRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.domain.user.exception.KeyNotFoundException;
import com.jobseek.speedjobs.domain.user.exception.RoleNotFoundException;
import com.jobseek.speedjobs.domain.user.exception.SignUpRuleException;
import com.jobseek.speedjobs.domain.user.exception.WrongPasswordException;
import com.jobseek.speedjobs.dto.user.UserCheckRequest;
import com.jobseek.speedjobs.dto.user.UserListResponse;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.dto.user.UserSearchCondition;
import com.jobseek.speedjobs.dto.user.company.CompanyInfoResponse;
import com.jobseek.speedjobs.dto.user.company.CompanyUpdateRequest;
import com.jobseek.speedjobs.dto.user.member.MemberInfoResponse;
import com.jobseek.speedjobs.dto.user.member.MemberUpdateRequest;
import com.jobseek.speedjobs.utils.MailUtil;
import com.jobseek.speedjobs.utils.RedisUtil;
import java.util.UUID;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserService {

	private final UserRepository userRepository;
	private final UserQueryRepository userQueryRepository;
	private final MemberRepository memberRepository;
	private final CompanyRepository companyRepository;
	private final PasswordEncoder passwordEncoder;
	private final RedisUtil redisUtil;
	private final MailUtil mailUtil;

	@Value("${front-url}")
	private String frontUrl;

	@Value("${back-url}")
	private String backUrl;

	public String sendRegisterMail(UserSaveRequest request) {
		validateUserSaveRequest(request);
		String key = UUID.randomUUID().toString();
		redisUtil.set(key, request, 30 * 60 * 1000);
		String src = backUrl + "/user/signup/confirm/" + key;
		mailUtil.sendMail(request.getEmail(), MailUtil.REGISTER_FILENAME, src);
		return key;
	}

	@Transactional
	public void approveCompany(Long userId) {
		User user = findOne(userId);
		user.changeRole(ROLE_COMPANY);
		mailUtil.sendMail(user.getEmail(), MailUtil.APPROVAL_FILENAME, frontUrl);
	}

	@Transactional
	public Long saveCustomUser(String key) {
		UserSaveRequest request = (UserSaveRequest) redisUtil.get(key)
			.orElseThrow(() -> new KeyNotFoundException("이미 처리된 요청이거나 시간초과되었습니다."));
		redisUtil.delete(key);
		UserDto userDto = request.getUserDto(passwordEncoder);
		if (userDto.getRole() == ROLE_MEMBER) {
			Member member = userDto.createMember();
			return memberRepository.save(member).getId();
		} else if (userDto.getRole() == ROLE_GUEST) {
			Company guest = userDto.createGuest();
			return companyRepository.save(guest).getId();
		} else {
			throw new RoleNotFoundException("존재하지 않는 역할입니다.");
		}
	}

	public MemberInfoResponse findMemberInfo(Long userId, User user) {
		user.validateMe(userId);
		Member member = findMember(userId);
		return MemberInfoResponse.of(member);
	}

	public CompanyInfoResponse findCompanyInfo(Long userId, User user) {
		user.validateMe(userId);
		Company company = findCompany(userId);
		return CompanyInfoResponse.of(company);
	}

	@Transactional
	public void updateMemberInfo(Long userId, MemberUpdateRequest request) {
		memberRepository.findById(userId)
			.map(member -> member.updateCustomMemberInfo(request.getName(), request.getNickname(),
				request.getPicture(), request.getContact(), request.getBirth(),
				request.getBio(), request.getGender()))
			.orElseThrow(() -> new NotFoundException("존재하지 않는 개인회원입니다."));
	}

	@Transactional
	public void updateCompanyInfo(Long userId, CompanyUpdateRequest request) {
		companyRepository.findById(userId)
			.map(company -> company.updateCompanyInfo(request.getName(), request.getNickname(),
				request.getPicture(), request.getContact(), request.getCompanyName(),
				request.getScale(), request.toCompanyDetail()))
			.orElseThrow(() -> new NotFoundException("존재하지 않는 기업회원입니다."));
	}

	@Transactional
	public void delete(UserCheckRequest userCheckRequest, Long targetId, User user) {
		user.validateMe(targetId);
		User target = findOne(targetId);
		validatePassword(userCheckRequest, target);
		userRepository.delete(target);
	}

	public Page<UserListResponse> findAll(UserSearchCondition condition, Pageable pageable) {
		return userQueryRepository.findAll(condition, pageable)
			.map(user -> {
					if (memberRepository.findById(user.getId()).isPresent()) {
						Member member = memberRepository.findById(user.getId()).get();
						return UserListResponse.of(user, member);
					} else if (companyRepository.findById(user.getId()).isPresent()) {
						Company company = companyRepository.findById(user.getId()).get();
						return UserListResponse.of(user, company);
					} else {
						return null;
					}
				}
			);
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
			throw new SignUpRuleException("회원가입 형식에 맞지 않습니다.");
		}

		if (request.getRole() == ROLE_GUEST) {
			if (!Pattern.matches(contactReg, request.getContact()) ||
				!Pattern.matches(companyNameReg, request.getCompanyName()) ||
				!Pattern.matches(homepageReg, request.getHomepage()) ||
				!Pattern.matches(registrationNumReg, request.getRegistrationNumber())
			) {
				throw new SignUpRuleException("회원가입 형식에 맞지 않습니다.");
			}
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new DuplicatedException("이미 존재하는 이메일입니다.");
		}
	}

	public void validatePassword(UserCheckRequest request, User user) {
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new WrongPasswordException("비밀번호가 틀렸습니다.");
		}
	}

	public User findOne(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 회원입니다."));
	}

	public Member findMember(Long userId) {
		return memberRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 개인회원입니다."));
	}

	public Company findCompany(Long userId) {
		return companyRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 기업회원입니다."));
	}
}
