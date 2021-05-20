package com.jobseek.speedjobs.domain.member;

import static javax.persistence.CascadeType.ALL;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "members")
@SuperBuilder
public class Member extends User {

	private String gender;

	private LocalDate birth;

	private String bio;

	private String oauthId;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Provider provider;

	@OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
	private final List<Resume> resumeList = new ArrayList<>();

	public Member(String name, String nickname, String email, String password, String picture,
		String contact, Role role, String gender, LocalDate birth, String bio, String oauthId,
		Provider provider) {
		super(name, nickname, email, password, picture, contact, role);
		this.gender = gender;
		this.birth = birth;
		this.bio = bio;
		this.oauthId = oauthId;
		this.provider = provider;
	}

	public void updateCustomMemberInfo(String name, String nickname, String picture,
		String contact, LocalDate birth, String bio, String gender) {
		updateCustomUserInfo(name, nickname, picture, contact);
		this.birth = birth;
		this.bio = bio;
		this.gender = gender;
	}

}
