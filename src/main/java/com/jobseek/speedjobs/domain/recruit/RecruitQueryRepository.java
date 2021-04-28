package com.jobseek.speedjobs.domain.recruit;

import static com.jobseek.speedjobs.domain.company.QCompany.*;
import static com.jobseek.speedjobs.domain.post.QPost.post;
import static com.jobseek.speedjobs.domain.recruit.QRecruit.*;
import static com.jobseek.speedjobs.domain.tag.QTag.*;
import static com.jobseek.speedjobs.utils.QueryDslUtil.getAllOrderSpecifiers;

import com.jobseek.speedjobs.domain.company.QCompany;
import com.jobseek.speedjobs.domain.tag.QTag;
import com.jobseek.speedjobs.dto.recruit.RecruitSearchCondition;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
@RequiredArgsConstructor
public class RecruitQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<Recruit> findAll(RecruitSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable, recruit);
		List<Recruit> content = queryFactory
			.selectFrom(recruit)
			.leftJoin(recruit.tags, tag)
			.leftJoin(recruit.company, company)
			.where(
				containsTagIds(condition.getTagIds()),
				containsTitle(condition.getTitle()),
				containsContent(condition.getContent()),
				containsCompanyName(condition.getCompanyName()),
				containsAddress(condition.getAddress()),
				goeAvgSalary(condition.getAvgSalary()),
				goeRating(condition.getRating())
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch().stream().distinct().collect(Collectors.toList());

		JPAQuery<Recruit> countQuery = queryFactory
			.selectFrom(recruit)
			.leftJoin(recruit.tags, tag)
			.leftJoin(recruit.company, company)
			.where(
				containsTagIds(condition.getTagIds()),
				containsTitle(condition.getTitle()),
				containsContent(condition.getContent()),
				containsCompanyName(condition.getCompanyName()),
				containsAddress(condition.getAddress()),
				goeAvgSalary(condition.getAvgSalary()),
				goeRating(condition.getRating())
			);
		return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
	}

	private BooleanExpression containsTagIds(List<Long> tagIds) {
		return (tagIds == null) ? null : recruit.tags.any().id.in(tagIds);
	}

	private BooleanExpression containsTitle(String title) {
		return !StringUtils.hasText(title) ? null : recruit.title.contains(title);
	}

	private BooleanExpression containsContent(String content) {
		return !StringUtils.hasText(content) ? null
			: recruit.recruitDetail.content.contains(content);
	}

	private BooleanExpression containsCompanyName(String companyName) {
		return !StringUtils.hasText(companyName) ? null
			: recruit.company.companyName.contains(companyName);
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

//	private BooleanExpression afterOpen(LocalDateTime open) {
//		return open == null ? null : recruit.openDate.after(open);
//	}

//	private BooleanExpression eqExperience(Experience experience) {
//		return ObjectUtils.isEmpty(experience) ? recruit.recruitDetail.experience.eq(experience) : null;
//	}


}
