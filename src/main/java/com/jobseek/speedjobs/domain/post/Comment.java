package com.jobseek.speedjobs.domain.post;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

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
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "comments")
public class Comment extends BaseTimeEntity {

	@ManyToMany(mappedBy = "commentFavorites")
	private List<User> favorites = new ArrayList<>();

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "user_id")
	private User user;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@Lob
	private String content;

	public void addComment(Post post) {
		post.getComments().add(this);
	}

	public void updateComment(Comment comment) {
		this.content = comment.getContent();
	}

	public void addFavorite(User user) {
		if (favoriteOf(user)) {
			throw new IllegalArgumentException("이미 추천한 댓글입니다.");
		}
		favorites.add(user);
		user.getCommentFavorites().add(this);
	}

	public void removeFavorite(User user) {
		if (!favoriteOf(user)) {
			throw new IllegalArgumentException("이미 추천 취소한 댓글입니다.");
		}
		favorites.remove(user);
		user.getCommentFavorites().remove(this);
	}

	public boolean favoriteOf(User user) {
		return favorites.contains(user);
	}

	public int getFavoriteCount() {
		return favorites.size();
	}
}
