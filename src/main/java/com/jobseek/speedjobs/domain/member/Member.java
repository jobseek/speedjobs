package com.jobseek.speedjobs.domain.member;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "members")
public class Member extends User {

	private String sex;

	private LocalDate birth;

	private String nickname;

	private String bio;

	@OneToMany(mappedBy = "member", fetch = LAZY, cascade = ALL)
	private List<Resume> resumeList = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Provider provider;

	@Column(name = "oauth_id")
	private String oauthId;

	public Member(UserDto userDto) {
		super(userDto.getName(), userDto.getEmail(), userDto.getPassword(), userDto.getPicture(),
			userDto.getRole());
		this.sex = userDto.getSex();
		this.birth = userDto.getBirth();
		this.nickname = userDto.getNickname();
		this.bio = userDto.getBio();
		this.provider = userDto.getProvider();
		this.oauthId = userDto.getOauthId();
	}

	public Member updateOAuthUserInfo(String name, String picture) {
		updateUserInfo(name, null, picture);
		return this;
	}

	public Member updateCustomUserInfo(String name, String password, String picture, String sex,
		LocalDate birth, String nickname, String bio) {
		updateUserInfo(name, password, picture);
		this.sex = sex;
		this.birth = birth;
		this.nickname = nickname;
		this.bio = bio;
		return this;
	}

}
