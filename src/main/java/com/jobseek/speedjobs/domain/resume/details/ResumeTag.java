package com.jobseek.speedjobs.domain.resume.details;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.tag.Type;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
public class ResumeTag {

	@Column(name = "tag_id")
	private Long id;

	@Column(length = 50)
	private String name;

	@Enumerated(EnumType.STRING)
	private Type type;

	public ResumeTag(Long id) {
		this.id = id;
	}

	public static List<ResumeTag> toEntity(List<Long> tagId) {
		return tagId.stream().map(ResumeTag::new).collect(Collectors.toList());
	}

}
