package com.jobseek.speedjobs.domain.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDate;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "members")
public class Member{

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	private String sex;

	private LocalDate birth;

	private String nickname;

	private String intro;

	@OneToOne(mappedBy = "member", fetch = LAZY, cascade = PERSIST)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "member", fetch = LAZY, cascade = ALL)
	private List<Resume> resumeList = new ArrayList<>();

	@Builder
	public Member(String sex, LocalDate birth, String nickname, String intro) {
		this.sex = sex;
		this.birth = birth;
		this.nickname = nickname;
		this.intro = intro;
	}

	public void setResumeList(List<Resume> resumeList) {
		this.resumeList = resumeList;
	}


}
