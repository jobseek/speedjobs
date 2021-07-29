package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_GUEST;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserQueryRepository;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.user.CompanyUpdateRequest;
import com.jobseek.speedjobs.dto.user.MemberUpdateRequest;
import com.jobseek.speedjobs.dto.user.UserCheckRequest;
import com.jobseek.speedjobs.dto.user.UserInfoResponse;
import com.jobseek.speedjobs.dto.user.UserListResponse;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.util.RedisUtil;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

	private final static Pattern UUID_REGEX_PATTERN =
		Pattern.compile("^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$");

	private User guest;
	private Member member;
	private Company company;

	private UserService userService;

	@Mock
	private ApplicationEventPublisher applicationEventPublisher;

	@Mock
	private UserRepository userRepository;

	@Mock
	private UserQueryRepository userQueryRepository;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private CompanyRepository companyRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private RedisUtil redisUtil;

	@BeforeEach
	void setUp() {
		userService = new UserService(applicationEventPublisher, userRepository,
			userQueryRepository, memberRepository, companyRepository, passwordEncoder, redisUtil);

		guest = User.builder()
			.id(1L)
			.name("guest")
			.email("guest@guest.com")
			.password("guestTest1!")
			.role(ROLE_GUEST)
			.build();

		member = Member.builder()
			.id(2L)
			.name("member")
			.email("member@member.com")
			.password("memberTest1!")
			.role(ROLE_GUEST)
			.comments(new ArrayList<>())
			.birth(LocalDate.now())
			.build();

		company = Company.builder()
			.id(3L)
			.name("company")
			.email("company@company.com")
			.password("companyTest1!")
			.role(ROLE_COMPANY)
			.companyDetail(CompanyDetail.builder().build())
			.scale(300)
			.build();
	}

	@DisplayName("회원가입 요청")
	@Test
	void register() {
		UserSaveRequest request = UserSaveRequest.builder()
			.name("member")
			.email("member@member.com")
			.password("memberTest1!")
			.role(ROLE_MEMBER)
			.build();
		given(userRepository.existsByEmail(any())).willReturn(false);

		String key = userService.register(request);

		assertTrue(UUID_REGEX_PATTERN.matcher(key).matches());
	}

	@DisplayName("기업회원 가입 승인")
	@Test
	void approveCompany() {
		assertEquals(ROLE_GUEST, guest.getRole());
		given(userRepository.findById(any())).willReturn(Optional.of(guest));

		userService.approveCompany(1L);

		assertEquals(ROLE_COMPANY, guest.getRole());
	}

	@DisplayName("회원가입 성공")
	@Test
	void save() {
		UserSaveRequest request = UserSaveRequest.builder()
			.name("member")
			.email("member@member.com")
			.password("memberTest1!")
			.role(ROLE_MEMBER)
			.build();
		given(redisUtil.get(any())).willReturn(Optional.of(request));
		given(userRepository.save(any(User.class))).willReturn(member);

		User user = userService.save("db56b8ae-405a-42c7-8c11-35652c024640");

		assertAll(
			() -> assertEquals(request.getName(), user.getName()),
			() -> assertEquals(request.getEmail(), user.getEmail()),
			() -> assertEquals(request.getPassword(), user.getPassword())
		);
	}

	@DisplayName("개인회원 정보 수정")
	@Test
	void updateMemberInfo() {
		MemberUpdateRequest request = MemberUpdateRequest.builder()
			.name("newMember")
			.bio("hello world")
			.birth(LocalDate.now())
			.build();
		given(memberRepository.findById(any())).willReturn(Optional.of(member));

		userService.updateMemberInfo(2L, request);

		assertAll(
			() -> assertEquals(request.getName(), member.getName()),
			() -> assertEquals(request.getBio(), member.getBio()),
			() -> assertEquals(request.getBirth(), member.getBirth())
		);
	}

	@DisplayName("기업회원 정보 수정")
	@Test
	void updateCompanyInfo() {
		CompanyUpdateRequest request = CompanyUpdateRequest.builder()
			.name("newCompany")
			.avgSalary(5000)
			.homepage("https://company.com")
			.build();
		given(companyRepository.findById(any())).willReturn(Optional.of(company));

		userService.updateCompanyInfo(3L, request);

		assertAll(
			() -> assertEquals(request.getName(), company.getName()),
			() -> assertEquals(request.getAvgSalary(), company.getCompanyDetail().getAvgSalary()),
			() -> assertEquals(request.getHomepage(), company.getCompanyDetail().getHomepage())
		);
	}

	@DisplayName("회원 삭제")
	@Test
	void delete() {
		UserCheckRequest request = UserCheckRequest.builder()
			.password(member.getPassword())
			.build();
		given(userRepository.findById(any())).willReturn(Optional.of(member));
		given(passwordEncoder.matches(any(), any())).willReturn(true);
		doNothing().when(userRepository).delete(member);

		userService.delete(request, 2L, member);

		verify(userRepository, times(1)).delete(member);
	}

	@DisplayName("개인회원 정보 조회")
	@Test
	void findOne_Member() {
		given(userRepository.findById(any())).willReturn(Optional.of(member));

		UserInfoResponse response = userService.findOne(2L);

		assertAll(
			() -> assertEquals(member.getName(), response.getName()),
			() -> assertEquals(member.getEmail(), response.getEmail()),
			() -> assertEquals(member.getBirth(), response.getBirth())
		);
	}

	@DisplayName("기업회원 정보 조회")
	@Test
	void findOne_Company() {
		given(userRepository.findById(any())).willReturn(Optional.of(company));

		UserInfoResponse response = userService.findOne(3L);

		assertAll(
			() -> assertEquals(company.getName(), response.getName()),
			() -> assertEquals(company.getEmail(), response.getEmail()),
			() -> assertEquals(company.getScale(), response.getScale())
		);
	}

	@DisplayName("회원 전체 조회")
	@Test
	void findAll() {
		List<User> users = List.of(member, company);
		given(userQueryRepository.findAll(any(), any()))
			.willReturn(new PageImpl<>(users));

		List<UserListResponse> responses = userService.findAll(null, null).toList();

		assertAll(
			() -> assertEquals(2, responses.size()),
			() -> assertEquals(member.getName(), responses.get(0).getName()),
			() -> assertEquals(member.getEmail(), responses.get(0).getEmail()),
			() -> assertEquals(member.getBirth(), responses.get(0).getBirth()),
			() -> assertEquals(company.getName(), responses.get(1).getName()),
			() -> assertEquals(company.getEmail(), responses.get(1).getEmail()),
			() -> assertEquals(company.getScale(), responses.get(1).getScale())
		);
	}

	@DisplayName("회원 조회")
	@Test
	void getUser() {
		given(userRepository.findById(any())).willReturn(Optional.of(guest));

		User found = userService.getUser(1L);

		assertAll(
			() -> assertEquals(guest.getName(), found.getName()),
			() -> assertEquals(guest.getEmail(), found.getEmail())
		);
	}

	@DisplayName("개인회원 조회")
	@Test
	void getMember() {
		given(memberRepository.findById(any())).willReturn(Optional.of(member));

		Member found = userService.getMember(2L);

		assertAll(
			() -> assertEquals(member.getName(), found.getName()),
			() -> assertEquals(member.getEmail(), found.getEmail())
		);
	}

	@DisplayName("기업회원 조회")
	@Test
	void getCompany() {
		given(companyRepository.findById(any())).willReturn(Optional.of(company));

		Company found = userService.getCompany(3L);

		assertAll(
			() -> assertEquals(company.getName(), found.getName()),
			() -> assertEquals(company.getEmail(), found.getEmail())
		);
	}
}
