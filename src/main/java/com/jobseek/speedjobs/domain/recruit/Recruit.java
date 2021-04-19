package com.jobseek.speedjobs.domain.recruit;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.likelist.RecruitLike;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.tag.RecruitTags;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity @Getter @Setter @Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "recruits")
public class Recruit extends BaseTimeEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_id")
	private Long id;

	private String title;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	@Enumerated
	private Status state;

	private String thumbnail;

	@ColumnDefault("0")
	private int likeCount;

	@ColumnDefault("0")
	private int viewCount;

	@Embedded
	private RecruitDetail recruitDetail;

	@ManyToOne(fetch = LAZY, cascade = ALL)
	@JoinColumn(name = "company_id")
	private Company company;

	@OneToMany(mappedBy = "recruit", cascade = ALL)
	private List<RecruitLike> recruitLikes = new ArrayList<>();

	@OneToMany(mappedBy = "recruit", cascade = ALL)
	private List<Apply> applyList = new ArrayList<>();

	@OneToMany(mappedBy = "recruit", cascade = ALL)
	private List<RecruitTags> recruitTags = new ArrayList<>();

	@OneToMany(mappedBy = "recruit", cascade = ALL)
	private List<Message> messageList = new ArrayList<>();
}
