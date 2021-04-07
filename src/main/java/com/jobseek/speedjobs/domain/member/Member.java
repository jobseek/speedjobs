package com.jobseek.speedjobs.domain.member;

import com.jobseek.speedjobs.domain.resume.Resume;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "members")
public class Member{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	private String name;

	private String sex;

	private String birth;

	private String nickName;

	private String intro;

	private String profileImage;

	@OneToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Resume> resumeList = new ArrayList<>();
}
