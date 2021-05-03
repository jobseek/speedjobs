package com.jobseek.speedjobs.domain.recruit;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.common.exception.DuplicatedException;
import com.jobseek.speedjobs.common.exception.NotFoundException;
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

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_id")
	private Long id;

	private String title;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	@Enumerated(EnumType.STRING)
	private Status status;

	private String thumbnail;

	private int experience;

	private int viewCount;

	private int favoriteCount;

	@Embedded
	private RecruitDetail recruitDetail;

	@OneToMany(mappedBy = "recruit", cascade = ALL, orphanRemoval = true)
	private final List<Apply> applies = new ArrayList<>();

	@OneToMany(cascade = ALL, orphanRemoval = true)
	private final List<Message> messages = new ArrayList<>();

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "company_id")
	private Company company;

	@ManyToMany
	@JoinTable(name = "recruit_tags",
		joinColumns = @JoinColumn(name = "recruit_id"),
		inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private final List<Tag> tags = new ArrayList<>();

	@ManyToMany(mappedBy = "recruitFavorites")
	private final List<User> favorites = new ArrayList<>();

	public void increaseViewCount() {
		viewCount += 1;
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

	public Recruit changeStatus() {
		this.status = Status.END;
		return this;
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
			throw new DuplicatedException("이미 찜한 공고입니다.");
		}
		favorites.add(user);
		user.getRecruitFavorites().add(this);
		favoriteCount += 1;
	}

	public void removeFavorite(User user) {
		if (!favoriteOf(user)) {
			throw new NotFoundException("찜 목록에 존재하지 않는 공고입니다.");
		}
		favorites.remove(user);
		user.getRecruitFavorites().remove(this);
		favoriteCount -= 1;
	}

	public boolean favoriteOf(User user) {
		if (user == null) {
			return false;
		}
		return user.getRecruitFavorites().contains(this);
	}
}

