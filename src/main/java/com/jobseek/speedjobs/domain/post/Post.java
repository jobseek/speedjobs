package com.jobseek.speedjobs.domain.post;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.likelist.PostLike;
import com.jobseek.speedjobs.domain.tag.PostTag;
import com.jobseek.speedjobs.domain.tag.PostTags;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "posts")
@ToString(exclude = {"postLikes", "comments", "postTags"})
public class Post extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "post", cascade = ALL)
	private final List<PostLike> postLikes = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = ALL, orphanRemoval = true)
	private final List<Comment> comments = new ArrayList<>();

	@Embedded
	private final PostTags postTags = PostTags.empty();

	private String title;

	@Embedded
	private PostDetail postDetail;

	private int likeCount;

	private int viewCount;

	private int commentCount;

	@Builder
	public Post(String title, PostDetail postDetail) {
		this.title = title;
		this.postDetail = postDetail;
	}

	public void increaseLikeCount() {
		this.likeCount += 1;
	}

	public void decreaseLikeCount() {
		this.likeCount -= 1;
	}

	public void increaseViewCount() {
		this.viewCount += 1;
	}

	public static Post createPost(String title, String content) {
		return new Post(title, PostDetail.from(content));
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void update(Post post, List<Tag> tags) {
		updatePostTags(tags);
		this.title = post.getTitle();
		this.postDetail = post.getPostDetail();
	}

//	public void addPostLike(PostLike postLike) {
//		postLikes.add(postLike);
//		postLike.setPost(this);
//	}

	public void updatePostTags(List<Tag> tags) {
		postTags.clear();
		tags.forEach(tag -> PostTag.createPostTag(this, tag));
	}
}
