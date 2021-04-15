package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.post.PostDetail;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import lombok.*;

import java.util.Set;

@Getter
@NoArgsConstructor
public class PostSaveDto {

	private Long userId;
	private String title;
	private String content;
	private Set<Long> tagIds;

	@Builder
	public PostSaveDto(Long userId, String title, String content) {
		this.userId = userId;
		this.title = title;
		this.content = content;
	}

	public Post toEntity(User user) {
		return Post.builder()
			.user(user)
			.title(title)
			.postDetail(PostDetail.from(content))
			.build();
	}

}
