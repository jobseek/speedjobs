package com.jobseek.speedjobs.domain.post;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import javax.persistence.Embeddable;
import javax.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Getter
@Setter
@Builder
public class PostDetail {

	//	@Column(columnDefinition = "TEXT")
	@Lob
	private String content;

	public static PostDetail from(String content) {
		return new PostDetail(content);
	}
}
