package com.jobseek.speedjobs.domain.post;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "comments")
public class Comment extends BaseTimeEntity {

	@Id @GeneratedValue
	@Column(name = "comment_id")
	private Long id;

	@Lob
	private String content;

	@ColumnDefault("0")
	private int likeCount;

	private String commentImage;

	@ManyToOne(fetch = LAZY, cascade = PERSIST)
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = LAZY, cascade = PERSIST)
	@JoinColumn(name = "user_id")
	private User user;
}
