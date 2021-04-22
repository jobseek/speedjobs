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
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.likelist.CompanyLike;
import com.jobseek.speedjobs.domain.likelist.PostLike;
import com.jobseek.speedjobs.domain.likelist.RecruitLike;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
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

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

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
	public User(String name, String email, String password, String picture, Role role) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.picture = picture;
		this.role = role;
	}

	public User updateUserInfo(String name, String password, String picture) {
		this.name = name;
		this.password = password;
		this.picture = picture;
		return this;
	}
}
