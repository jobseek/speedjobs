package com.jobseek.speedjobs.domain.tag;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

	@ManyToOne
	@JoinColumn(name = "recruit_id")
	private Recruit recruit;

	@ManyToOne
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
