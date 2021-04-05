package com.jobseek.speedjobs.domain.post;


import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.Role;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

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

	private String content;

	@ColumnDefault("0")
	private int likeCount;

	@ColumnDefault("0")
	private int viewCount;

	@ColumnDefault("0")
	private int commentCount;

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
		this.content = content;
	}
}
