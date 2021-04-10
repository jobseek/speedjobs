package com.jobseek.speedjobs.domain.user;

import com.jobseek.speedjobs.domain.likelist.CompanyLikeList;
import com.jobseek.speedjobs.domain.likelist.PostLikeList;
import com.jobseek.speedjobs.domain.likelist.RecruitLikeList;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import javax.persistence.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.post.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "users")
public class User extends BaseTimeEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	private String name;

	@Column(unique = true)
	private String email;

	private String password;

	private String picture;

	private String contact;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Provider provider;

	@Column(name = "oauth_id")
	private String oauthId;

	@OneToOne(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private Member member;

	@OneToOne(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private Company company;

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<Post> postList = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<CompanyLikeList> companyLikeLists = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<RecruitLikeList> recruitLikeLists = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<PostLikeList> postLikeLists = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<Message> messageList = new ArrayList<>();

	@Builder
	public User(String name, String email, String password, String picture, String contact,
		Role role, Provider provider, String oauthId) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.picture = picture;
		this.contact = contact;
		this.role = role;
		this.provider = provider;
		this.oauthId = oauthId;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public static User createCustomUser(UserSaveRequest userSaveRequest, PasswordEncoder passwordEncoder) {
		User user = User.builder()
			.name(userSaveRequest.getName())
			.email(userSaveRequest.getEmail())
			.password(passwordEncoder.encode(userSaveRequest.getPassword()))
			.contact(userSaveRequest.getContact())
			.role(userSaveRequest.getRole())
			.provider(Provider.LOCAL)
			.build();

		if (user.getRole() == Role.ROLE_MEMBER) {
			user.setMember(Member.builder().build());
		} else if (user.getRole() == Role.ROLE_COMPANY) {
			user.setCompany(Company.builder().build());
		}

		return user;
	}

	public User updateOAuthUserInfo(String name, String picture) {
		this.name = name;
		this.picture = picture;
		return this;
	}
}
