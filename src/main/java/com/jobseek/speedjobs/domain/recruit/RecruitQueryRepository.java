package com.jobseek.speedjobs.domain.recruit;

import static com.jobseek.speedjobs.domain.company.QCompany.company;
import static com.jobseek.speedjobs.domain.recruit.QRecruit.recruit;
import static com.jobseek.speedjobs.domain.tag.QTag.tag;
import static com.jobseek.speedjobs.utils.QueryDslUtil.getAllOrderSpecifiers;

import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class RecruitQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<Recruit> findAll(RecruitSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable, recruit);

		JPAQuery<Recruit> query = queryFactory
			.selectDistinct(recruit)
			.from(recruit)
			.leftJoin(recruit.tags, tag).fetchJoin()
			.leftJoin(recruit.company, company).fetchJoin()
			.where(
				containsTagIds(condition.getTagIds()),
				containsTitleOrCompanyName(condition.getTitle(), condition.getCompanyName()),
				containsContent(condition.getContent()),
				containsAddress(condition.getAddress()),
				goeAvgSalary(condition.getAvgSalary()),
				goeRating(condition.getRating()),
				betweenDateTime(condition.getOpenDateTime(), condition.getCloseDateTime()),
				loeExperience(condition.getExperience()),
				containsStatus(condition.getStatus())
			);

		List<Recruit> content = query
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch().stream().distinct().collect(Collectors.toList());

		return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
	}

	private BooleanExpression containsTagIds(List<Long> tagIds) {
		return (tagIds == null) ? null : recruit.tags.any().id.in(tagIds);
	}

	private BooleanExpression containsTitle(String title) {
		return !StringUtils.hasText(title) ? null : recruit.title.contains(title);
	}

	private BooleanExpression containsCompanyName(String companyName) {
		return !StringUtils.hasText(companyName) ? null
			: recruit.company.companyName.contains(companyName);
	}

	private BooleanExpression containsTitleOrCompanyName(String title, String companyName) {
		if (StringUtils.hasText(title) && StringUtils.hasText(companyName)) {
			return Objects.requireNonNull(containsTitle(title))
				.or(containsCompanyName(companyName));
		}
		return StringUtils.hasText(title) ? containsTitle(title) : containsCompanyName(companyName);
	}

	private BooleanExpression containsContent(String content) {
		return !StringUtils.hasText(content) ? null
			: recruit.recruitDetail.content.contains(content);
	}

	private BooleanExpression containsAddress(String address) {
		return !StringUtils.hasText(address) ? null
			: recruit.company.companyDetail.address.contains(address);
	}

	private BooleanExpression goeAvgSalary(Integer avgSalary) {
		return avgSalary == null ? null : recruit.company.companyDetail.avgSalary.goe(avgSalary);
	}

	private BooleanExpression goeRating(Double rating) {
		return rating == null ? null : recruit.company.companyDetail.rating.goe(rating);
	}

	private BooleanExpression betweenDateTime(LocalDateTime openDateTime,
		LocalDateTime closeDateTime) {
		if (openDateTime == null || closeDateTime == null) {
			return null;
		}
		return recruit.openDate.between(openDateTime, closeDateTime);
	}

	private BooleanExpression loeExperience(Integer experience) {
		return experience == null ? null : recruit.experience.loe(experience);
	}

	private BooleanExpression containsStatus(List<Status> status) {
		return ObjectUtils.isEmpty(status) ? null : recruit.status.in(status);
	}

}
