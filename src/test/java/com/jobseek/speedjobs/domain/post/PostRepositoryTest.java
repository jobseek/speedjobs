package com.jobseek.speedjobs.domain.post;

import static com.jobseek.speedjobs.domain.user.Provider.LOCAL;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.assertj.core.api.Assertions.*;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.company.CompanyRepository;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.member.MemberRepository;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import com.jobseek.speedjobs.dto.post.PostRequest;
import com.jobseek.speedjobs.service.PostService;
import java.util.Arrays;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Commit
@Slf4j
class PostRepositoryTest {

	@Autowired
	PostService postService;

	@Autowired
	MemberRepository memberRepository;
	@Autowired
	CompanyRepository companyRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;

	@BeforeEach
	public void before() {
		Member member = Member.builder()
			.sex("M")
			.birth("1992-05-30")
			.nickname("잡식이")
			.intro("hello")
			.build();
		Company company = Company.builder()
			.companyName("잡식컴퍼니")
			.logoImage("https://jobSeek.com/image/1")
			.scale(1)
			.companyDetail(
				CompanyDetail.from("111-22-33333", "jobspeed", "https://www.jobSeek.com"))
			.build();
		memberRepository.save(member);
		companyRepository.save(company);

		User user1 = new User("member", "member@test.com", "test2021!@", "", "010-1234-5678",
			ROLE_MEMBER, LOCAL, null, member);
		User user2 = new User("company", "company@test.com", "test2021!@", "", "010-1323-4242",
			ROLE_COMPANY, LOCAL, null, company);
		userRepository.save(user1);
		userRepository.save(user2);
		PostRequest data = PostRequest.builder().title("제목").content("내용")
			.tagIds(Arrays.asList(1L, 2L, 3L)).build();
		PostRequest data2 = PostRequest.builder().title("스프링").content("어렵다")
			.tagIds(Arrays.asList(4L, 7L)).build();
		postService.save(data, user1);
		postService.save(data2, user1);
	}

	@Test
	@DisplayName(value = "검색테스트")
	public void findUser() throws Exception
	{
		List<Post> findPosts = postRepository.findAllByUserId(1L);
		for (Post findPost : findPosts) {
			log.info("포스트 : {}", findPost);
		}
		assertThat(findPosts.size()).isEqualTo(2);
	}
}
