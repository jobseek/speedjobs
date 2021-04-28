package com.jobseek.speedjobs.domain.recruit;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.resume.Apply;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PRIVATE)
@Table(name = "recruits")
public class Recruit extends BaseTimeEntity {

	@ManyToMany
	@JoinTable(name = "recruit_tags",
		joinColumns = @JoinColumn(name = "recruit_id"),
		inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private final List<Tag> tags = new ArrayList<>();

	@ManyToMany(mappedBy = "recruitFavorites")
	private final List<User> favorites = new ArrayList<>();

	@OneToMany(mappedBy = "recruit", cascade = ALL, orphanRemoval = true)
	private final List<Apply> applies = new ArrayList<>();

	@OneToMany(cascade = ALL, orphanRemoval = true)
	private final List<Message> messages = new ArrayList<>();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_id")
	private Long id;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "company_id")
	private Company company;

	private String title;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	@Enumerated(EnumType.STRING)
	private Status status;

	private String thumbnail;

	private int viewCount;

	@Embedded
	private RecruitDetail recruitDetail;

	@Builder
	public Recruit(String title, LocalDateTime openDate, LocalDateTime closeDate,
		Status status, String thumbnail,
		RecruitDetail recruitDetail) {
		this.title = title;
		this.openDate = openDate;
		this.closeDate = closeDate;
		this.status = status;
		this.thumbnail = thumbnail;
		this.recruitDetail = recruitDetail;
	}

	public static Recruit createRecruit(String title, LocalDateTime openDate,
		LocalDateTime closeDate,
		Status status, String thumbnail, Experience experience, Position position, String content) {
		return new Recruit(title, openDate, closeDate, status, thumbnail,
			RecruitDetail.from(experience, position, content));
	}

	public void increaseViewCount() {
		viewCount += 1;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public void update(Recruit recruit, List<Tag> tags) {
		removeTags();
		addTags(tags);
		this.title = recruit.getTitle();
		this.openDate = recruit.getOpenDate();
		this.closeDate = recruit.getCloseDate();
		this.status = recruit.getStatus();
		this.thumbnail = recruit.getThumbnail();
		this.recruitDetail = recruit.getRecruitDetail();
	}

	public void addTags(List<Tag> tags) {
		for (Tag tag : tags) {
			this.tags.add(tag);
			tag.getRecruits().add(this);
		}
	}

	public void removeTags() {
		tags.forEach(tag -> tag.getRecruits().remove(this));
		tags.clear();
	}

	public void addFavorite(User user) {
		if (favoriteOf(user)) {
			throw new IllegalArgumentException("이미 찜한 공고입니다.");
		}
		favorites.add(user);
		user.getRecruitFavorites().add(this);
	}

	public void removeFavorite(User user) {
		if (!favoriteOf(user)) {
			throw new IllegalArgumentException("찜 목록에 존재하지 않는 공고입니다.");
		}
		favorites.remove(user);
		user.getRecruitFavorites().remove(this);
	}

	public boolean favoriteOf(User user) {
		return favorites.contains(user);
	}

	public int getFavoriteCount() {
		return favorites.size();
	}
}
