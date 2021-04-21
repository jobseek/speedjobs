package com.jobseek.speedjobs.dto.post;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CommentListResponse {
  private Long id;
  private String title;
  private String content;
  private LocalDateTime createDate;
  private String author;

  @Builder
  public CommentListResponse(Long id, String title, String content,
      LocalDateTime createDate, String author) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createDate = createDate;
    this.author = author;
  }
}
