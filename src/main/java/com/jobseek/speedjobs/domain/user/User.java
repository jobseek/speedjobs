package com.jobseek.speedjobs.domain.user;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;

import com.jobseek.speedjobs.common.exception.NotSelfException;
import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.post.Comment;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.recruit.Recruit;
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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@Entity
@Table(name = "users")
public class User extends BaseTimeEntity {

	@ManyToMany
	@JoinTable(name = "post_favorites",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "post_id")
	)
	private final List<Post> postFavorites = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "comment_favorites",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "comment_id")
	)
	private final List<Comment> commentFavorites = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "recruit_favorites",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "recruit_id")
	)
	private final List<Recruit> recruitFavorites = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = ALL, orphanRemoval = true)
	private List<Post> posts;

	@OneToMany(mappedBy = "user", cascade = ALL, orphanRemoval = true)
	private List<Comment> comments;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	private String name;

	private String nickname;

	@Column(unique = true)
	private String email;

	private String password;

	private String picture;

	private String contact;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Builder
	public User(String name, String nickname, String email, String password, String picture,
		String contact, Role role) {
		this.name = name;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.picture = picture;
		this.contact = contact;
		this.role = role;
	}

	public User updateCustomUserInfo(String name, String nickname, String picture, String contact) {
		this.name = name;
		this.nickname = nickname;
		this.picture = picture;
		this.contact = contact;
		return this;
	}

	public void changeRole(Role role) {
		this.role = role;
	}

	public boolean isMember() {
		return role == Role.ROLE_MEMBER;
	}

	public boolean isCompany() {
		return role == Role.ROLE_COMPANY;
	}

	public boolean isAdmin() {
		return role == Role.ROLE_ADMIN;
	}

	public void validateMe(Long id) {
		if (!this.id.equals(id)) {
			throw new NotSelfException(id, this.id);
		}
	}
}
