package com.jobseek.speedjobs.domain.post;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.IllegalParameterException;
import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "comments")
public class Comment extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@Lob
	private String content;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany
	@JoinTable(name = "comment_favorites",
		joinColumns = @JoinColumn(name = "comment_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private final List<User> favorites = new ArrayList<>();

	@Builder
	private Comment(Long id, String content, Post post, User user) {
		validateParams(content, post, user);
		this.id = id;
		this.content = content;
		this.post = post;
		this.user = user;
	}

	private void validateParams(String content, Post post, User user) {
		if (StringUtils.isBlank(content) || ObjectUtils.anyNull(post, user)) {
			throw new IllegalParameterException();
		}
	}

	public void update(String content) {
		if (StringUtils.isBlank(content)) {
			throw new IllegalParameterException();
		}
		this.content = content;
	}

	public void addFavorite(User user) {
		if (favoriteOf(user)) {
			throw new DuplicatedException("이미 추천한 댓글입니다.");
		}
		favorites.add(user);
	}

	public void removeFavorite(User user) {
		if (!favoriteOf(user)) {
			throw new DuplicatedException("이미 추천 취소한 댓글입니다.");
		}
		favorites.remove(user);
	}

	public boolean favoriteOf(User user) {
		return favorites.contains(user);
	}

	public int getFavoriteCount() {
		return favorites.size();
	}
}
