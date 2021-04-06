package com.jobseek.speedjobs.domain.user;

import javax.persistence.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import com.jobseek.speedjobs.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "users")
public class User extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	private String name;

	private String email;

	private String password;

	private String picture;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Provider provider;

	@Column(name = "oauth_id")
	private String oauthId;

	@OneToOne(mappedBy = "user", fetch = LAZY)
	private Member member;

	public User update(String name, String picture) {
		this.name = name;
		this.picture = picture;
		return this;
	}
}
