package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.common.exception.UnMatchedException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;
import com.jobseek.speedjobs.domain.user.UserQueryRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.domain.user.exception.NotFoundKeyException;
import com.jobseek.speedjobs.domain.user.exception.NotFoundRoleException;
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

	public User findOne(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다. id=" + userId));
	}

	public String sendRegisterEmail(UserSaveRequest request) {
		validateUserSaveRequest(request);
		String key = UUID.randomUUID().toString();
		log.info("uuid key - {}", key);
		redisUtil.set(key, request, 30 * 60 * 1000);
		String subject = "[speedjobs] 가입완료를 위해 이메일 인증을 해주세요.";
		String content = "아래 버튼을 클릭하여 인증을 완료해주세요";
		String src = backUrl + "/user/signup/confirm/" + key;
		mailUtil.sendEmail(request.getEmail(), subject, content, src);
		return src;
	}

	@Transactional
	public void approveCompany(Long userId) {
		User user = findOne(userId);
		user.changeRole(ROLE_COMPANY);
		String subject = "[speedjobs] 기업회원으로 가입되었습니다.";
		String content = "스피드잡스를 통해 역량 높은 인재를 채용하세요.";
		String src = frontUrl;
		mailUtil.sendEmail(user.getEmail(), subject, content, src);
	}

	@Transactional
	public Long saveCustomUser(String key) {
		UserSaveRequest request = (UserSaveRequest) redisUtil.get(key)
			.orElseThrow(() -> new NotFoundKeyException("이미 처리된 요청이거나 시간초과되었습니다."));
		redisUtil.delete(key);
		UserDto userDto = request.getUserDto(passwordEncoder);
		userDto.setNickname(request.getName());
		if (userDto.getRole() == ROLE_MEMBER) {
			Member member = new Member(userDto);
			return memberRepository.save(member).getId();
		} else if (userDto.getRole() == ROLE_GUEST) {
			Company company = new Company(userDto);
			return companyRepository.save(company).getId();
		} else {
			throw new NotFoundRoleException("존재하지 않는 역할입니다.");
		}
	}

	public MemberInfoResponse findMemberInfo(Long userId, User user) {
		user.validateMe(userId);
		Member member = memberRepository.findById(userId)
			.orElseThrow(() -> new UnMatchedException("개인회원이 아닙니다."));
		return MemberInfoResponse.of(member);
	}

	public CompanyInfoResponse findCompanyInfo(Long userId, User user) {
		user.validateMe(userId);
		Company company = companyRepository.findById(userId)
			.orElseThrow(() -> new UnMatchedException("기업회원이 아닙니다."));
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
		return userQueryRepository.findAll(condition, pageable).map(UserListResponse::of);
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
}
