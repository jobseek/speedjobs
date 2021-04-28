package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Provider.LOCAL;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.assertj.core.api.Assertions.assertThat;

import com.jobseek.speedjobs.common.exception.NotExistException;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.post.PostRequest;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//class PostServiceTest {
//
//	@Autowired
//	private
//
//	@Test
//	public void queryFavorites() {
//
//	}

//	@Autowired
//	PostService postService;
//
//	@Autowired
//	MemberRepository memberRepository;
//	@Autowired
//	CompanyRepository companyRepository;
//	@Autowired
//	UserRepository userRepository;
//	@Autowired
//	PostRepository postRepository;
//
//	@BeforeEach
//	public void before() {
//		Member member = Member.builder()
//			.sex("M")
//			.birth("1992-05-30")
//			.nickname("잡식이")
//			.intro("hello")
//			.build();
//		Company company = Company.builder()
//			.companyName("잡식컴퍼니")
//			.logoImage("https://jobSeek.com/image/1")
//			.scale(1)
//			.companyDetail(
//				CompanyDetail.from("111-22-33333", "jobspeed", "https://www.jobSeek.com"))
//			.build();
//		memberRepository.save(member);
//		companyRepository.save(company);
//
//		User user1 = new User("member", "member@test.com", "test2021!@", "", "010-1234-5678",
//			ROLE_MEMBER, LOCAL, null, member);
//		User user2 = new User("company", "company@test.com", "test2021!@", "", "010-1323-4242",
//			ROLE_COMPANY, LOCAL, null, company);
//		userRepository.save(user1);
//		userRepository.save(user2);
//		PostRequest data = PostRequest.builder().title("제목").content("내용")
//			.tagIds(Arrays.asList(1L, 2L, 3L)).build();
//		PostRequest data2 = PostRequest.builder().title("스프링").content("어렵다")
//			.tagIds(Arrays.asList(4L, 7L)).build();
//		postService.save(data, user1);
//		postService.save(data2, user1);
//	}
//
//	@Test
//	@DisplayName(value = "저장 테스트")
//	public void save() throws Exception {
//		//given
//		PostRequest data = PostRequest.builder().title("title").content("content")
//			.tagIds(Arrays.asList(10L, 13L, 15L)).build();
//		User user = userRepository.findByEmail("member@test.com")
//			.orElseThrow(() -> new NotExistException("존재하지 않습니다."));
//
//		//when
////		log.info("유저데이터 : {}", user);
////		log.info("유저이름 : {}", user.getName());
//		Long savedId = postService.save(data, user);
//
//		//then
//		assertThat(savedId).isEqualTo(3L);
//	}
//
//	@Test
//	@DisplayName(value = "수정 테스트")
//	public void update() throws Exception {
//		//given
//		User user = userRepository.findByEmail("member@test.com")
//			.orElseThrow(() -> new NotExistException("존재하지 않습니다."));
//		PostRequest data = PostRequest.builder().title("수정된제목").content("수정된내용")
//			.tagIds(Arrays.asList(2L, 3L, 4L)).build();
//
//		//when
//		postService.update(1L, user, data);
//
//		//then
//		Post post = postRepository.findById(1L)
//			.orElseThrow(() -> new IllegalArgumentException("없다"));
//		assertThat(post.getTitle()).isEqualTo("수정된제목");
//	}
//
//	@Test
//	@DisplayName(value = "삭제 테스트")
//	public void delete() throws Exception {
//		//given
//
//		//when
//
//		//then
//	}


//}
