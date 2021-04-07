package com.jobseek.speedjobs.domain.post;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PostDetail {
//	@Column(columnDefinition = "TEXT")
	@Lob
	private String content;

	public static PostDetail from(String content) {
		return new PostDetail(content);
	}
}
