package com.jobseek.speedjobs.domain.post;


import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;

import javax.persistence.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import com.jobseek.speedjobs.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "posts")
public class Post extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "user_id")
	private User user;

	@ColumnDefault("0")
	private int likeCount;

	@ColumnDefault("0")
	private int viewCount;

	@ColumnDefault("0")
	private int commentCount;

	@Embedded
	private PostDetail postDetail;

	public void increaseLikeCount() {
		likeCount += 1;
	}

	public void decreaseLikeCount() {
		likeCount -= 1;
	}

	public void increaseViewCount() {
		viewCount += 1;
	}

	public void decreaseViewCount() {
		viewCount -= 1;
	}

	public void increaseCommentCount() {
		commentCount += 1;
	}

	public void decreaseCommentCount() {
		commentCount -= 1;
	}

	public void update(String title, String content) {
		this.title = title;
		this.postDetail = PostDetail.from(content);
	}
}
