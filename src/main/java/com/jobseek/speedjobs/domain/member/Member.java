package com.jobseek.speedjobs.domain.member;

import static javax.persistence.CascadeType.ALL;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.Provider;
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
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "user_id")
@Table(name = "members")
public class Member extends User {

	private String gender;

	private LocalDate birth;

	private String bio;

	private String oauthId;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Provider provider;

	@OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
	private final List<Resume> resumes = new ArrayList<>();

	public void updateCustomMemberInfo(Member member) {
		updateCustomUserInfo(member.getName(), member.getNickname(), member.getPicture(),
			member.getContact());
		this.birth = member.birth;
		this.bio = member.bio;
		this.gender = member.gender;
	}
}
