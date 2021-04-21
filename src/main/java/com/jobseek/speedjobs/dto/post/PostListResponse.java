package com.jobseek.speedjobs.dto.post;

import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.tag.PostTags;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PostListResponse {
  private Long id;
  private String title;
  private PostTags tags;
  private String Author;
  private LocalDateTime createdDate;

  @Builder
  public PostListResponse(Long id, String title, String author,
      PostTags tags,LocalDateTime createdDate) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.Author = author;
    this.createdDate = createdDate;
  }

  public static PostListResponse of(Post post, PostTags tagResponses) {
    return PostListResponse.builder()
        .id(post.getId())
        .title(post.getTitle())
        .author(post.getUser().getName())
        .tags(tagResponses)
        .createdDate(post.getCreatedDate())
        .build();
  }

}
