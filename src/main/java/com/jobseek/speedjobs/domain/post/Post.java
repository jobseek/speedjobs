package com.jobseek.speedjobs.domain.post;

import javax.persistence.*;

import com.jobseek.speedjobs.domain.BaseTimeEntity;

import com.jobseek.speedjobs.domain.likelist.PostLikeList;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = PRIVATE)
@Table(name = "posts")
public class Post extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private Long id;

	private String title;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "user_id")
	private User user;

	private int likeCount;

	private int viewCount;

	private int commentCount;

	@Embedded
	private PostDetail postDetail;

	@OneToMany(mappedBy = "post", cascade = ALL)
	private List<PostLikeList> postLikeLists = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = ALL)
	private List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = PERSIST)
	private Set<PostTag> postTags = new HashSet<>();

	public void increaseLikeCount() {
		likeCount += 1;
	}

	public void decreaseLikeCount() {
		likeCount -= 1;
	}

	public void increaseViewCount() {
		viewCount += 1;
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

	//연관관계 편의 메서드
	public void setUser(User user) {
		this.user = user;
		user.getPostList().add(this);
	}

	public void addPostLike(PostLikeList postLikeList) {
		postLikeLists.add(postLikeList);
		postLikeList.setPost(this);
	}

	public void addComment(Comment comment) {
		commentList.add(comment);
		comment.setPost(this);
	}

	public void addPostTag(PostTag postTag) {
		postTags.add(postTag);
		postTag.setPost(this);
	}

	//생성 메서드
	public void initCount() {
		this.likeCount = 0;
		this.viewCount = 0;
		this.commentCount = 0;
	}

	//비즈니스 로직
	//봤을때, 댓글을 추가/삭제했을때, 좋아요 눌렀을때, 공고찜목록에 추가했을때, 태그를 추가했을 때
	/**
	* 포스트를 봤을 때
	*/
	public void showed() {
		increaseViewCount();
	}

	/**
	* 댓글 달렸을 때
	*/
	public void addComment() {
		increaseCommentCount();
	}

	/**
	* 댓글 지울 때
	*/
	public void deleteComment() {
		decreaseCommentCount();
	}

	/**
	* 좋아요 눌렸을 때
	*/
	public void pushLike() {
		increaseLikeCount();
	}

	/**
	* 싫어요 눌렀을 때
	*/
	public void pushHate() {
		decreaseLikeCount();
	}

}
