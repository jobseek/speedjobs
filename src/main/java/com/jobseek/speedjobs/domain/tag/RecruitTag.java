package com.jobseek.speedjobs.domain.tag;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.post.Post;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Entity
@Table(name = "recruit_tags")
public class RecruitTag extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_tag_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "recruit_id")
	private Recruit recruit;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "tag_id")
	private Tag tag;

	public static RecruitTag createRecruitTag(Recruit recruit, Tag tag) {
		RecruitTag recruitTag = new RecruitTag();
		recruitTag.setRecruit(recruit);
		recruitTag.setTag(tag);
		return recruitTag;
	}

	public void deleteRecruitTag() {
		tag = null;
		recruit.getRecruitTags().removeRecruitTag(this);
	}

	public void setRecruit(Recruit recruit) {
		this.recruit = recruit;
		recruit.getRecruitTags().addRecruitTag(this);
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}
}
