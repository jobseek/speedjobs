package com.jobseek.speedjobs.domain.member;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
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
		super(userDto.getName(), userDto.getEmail(), userDto.getPassword(), userDto.getPicture(), userDto.getRole());
		this.sex = userDto.getSex();
		this.birth = userDto.getBirth();
		this.nickname = userDto.getNickname();
		this.bio = userDto.getBio();
	}

}
