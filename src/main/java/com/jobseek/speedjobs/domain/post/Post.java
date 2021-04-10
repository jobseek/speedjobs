package com.jobseek.speedjobs.domain.post;

import javax.persistence.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import com.jobseek.speedjobs.domain.likelist.PostLikeList;
import com.jobseek.speedjobs.domain.tag.BoardTag;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "posts")
public class Post extends BaseTimeEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
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

	@OneToMany(mappedBy = "post", cascade = ALL)
	private List<PostLikeList> postLikeLists = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = ALL)
	private List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = ALL)
	private List<BoardTag> boardTags = new ArrayList<>();

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
