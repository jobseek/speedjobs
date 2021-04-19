package com.jobseek.speedjobs.domain.user;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.likelist.CompanyLike;
import com.jobseek.speedjobs.domain.likelist.PostLike;
import com.jobseek.speedjobs.domain.likelist.RecruitLike;
import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
@Table(name = "users")
public class User extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@OneToOne(fetch = LAZY, cascade = ALL)
	private Member member;

	@OneToOne(fetch = LAZY, cascade = ALL)
	private Company company;

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<Post> postList = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<CompanyLike> companyLikes = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<RecruitLike> recruitLikes = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL)
	private List<PostLike> postLikes = new ArrayList<>();

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
		member.setUser(this);
	}

	public void setCompany(Company company) {
		this.company = company;
		company.setUser(this);
	}

	public User updateOAuthUserInfo(String name, String picture) {
		this.name = name;
		this.picture = picture;
		return this;
	}
}
