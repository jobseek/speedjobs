package com.jobseek.speedjobs.dto.recruit;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
public class RecruitListResponse {

	private Long id;
	private String title;
	private LocalDateTime openDate;
	private LocalDateTime closeDate;
	private Status status;
	private String thumbnail;
	private Integer experience;
	private Position position;
	private Map<Type, List<TagMap>> tags;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private int viewCount;
	private int favoriteCount;
	private boolean favorite;
	// company
	private Long companyId;
	private String companyName;
	private String logoImage;

	public static RecruitListResponse of(Recruit recruit, User user) {
		Company company = recruit.getCompany();
		return RecruitListResponse.builder()
			.id(recruit.getId())
			.title(recruit.getTitle())
			.openDate(recruit.getOpenDate())
			.closeDate(recruit.getCloseDate())
			.status(recruit.getStatus())
			.thumbnail(recruit.getThumbnail())
			.experience(recruit.getExperience())
			.position(recruit.getRecruitDetail().getPosition())
			.tags(TagMap.toMap(recruit.getTags()))
			.createdDate(recruit.getCreatedDate())
			.modifiedDate(recruit.getModifiedDate())
			.viewCount(recruit.getViewCount())
			.favoriteCount(recruit.getFavoriteCount())
			.favorite(recruit.favoriteOf(user))
			.companyId(company.getId())
			.companyName(company.getCompanyName())
			.logoImage(company.getLogoImage())
			.build();
	}
}
