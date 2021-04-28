package com.jobseek.speedjobs.dto.recruit;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.recruit.Experience;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.tag.TagMap;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RecruitResponse {

	private Long id;
	private String title;
	private LocalDateTime openDate;
	private LocalDateTime closeDate;
	private Status status;
	private String thumbnail;
	private Experience experience;
	private Position position;
	private String content;
	private Map<Type, List<TagMap>> tags;
	private int viewCount;
	private int favoriteCount;
	private boolean favorite;
	// company
	private Long companyId;
	private String companyName;
	private String logoImage;
	private int scale;
	private String description;
	private String homepage;
	private String address;
	private Integer avgSalary; // 단위: 만원
	private Double latitude; // 위도
	private Double longitude; // 경도
	private Double rating; // 평가점수

	public static RecruitResponse of(Recruit recruit, User user) {
		Company company = recruit.getCompany();
		return RecruitResponse.builder()
			.id(recruit.getId())
			.title(recruit.getTitle())
			.openDate(recruit.getOpenDate())
			.closeDate(recruit.getCloseDate())
			.status(recruit.getStatus())
			.thumbnail(recruit.getThumbnail())
			.experience(recruit.getRecruitDetail().getExperience())
			.position(recruit.getRecruitDetail().getPosition())
			.content(recruit.getRecruitDetail().getContent())
			.tags(TagMap.toMap(recruit.getTags()))
			.viewCount(recruit.getViewCount())
			.favoriteCount(recruit.getFavoriteCount())
			.favorite(recruit.favoriteOf(user))
			.companyId(company.getId())
			.companyName(company.getCompanyName())
			.logoImage(company.getLogoImage())
			.scale(company.getScale())
			.description(company.getCompanyDetail().getDescription())
			.homepage(company.getCompanyDetail().getHomepage())
			.address(company.getCompanyDetail().getAddress())
			.avgSalary(company.getCompanyDetail().getAvgSalary())
			.latitude(company.getCompanyDetail().getLatitude())
			.longitude(company.getCompanyDetail().getLongitude())
			.rating(company.getCompanyDetail().getRating())
			.build();
	}
}
