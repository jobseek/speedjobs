package com.jobseek.speedjobs.domain.post;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;

import static lombok.AccessLevel.*;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Getter @Setter @Builder
public class PostDetail {

	//	@Column(columnDefinition = "TEXT")
	@Lob
	private String content;

	public static PostDetail from(String content) {
		return new PostDetail(content);
	}
}
