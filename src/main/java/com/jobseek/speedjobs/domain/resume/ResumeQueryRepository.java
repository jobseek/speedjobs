package com.jobseek.speedjobs.domain.resume;

import static com.jobseek.speedjobs.domain.member.QMember.member;
import static com.jobseek.speedjobs.domain.resume.QApply.apply;
import static com.jobseek.speedjobs.domain.resume.QResume.resume;

import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.resume.ResumeSearchCondition;
import com.jobseek.speedjobs.util.QueryDslUtil;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

@SuppressWarnings("rawtypes")
@RequiredArgsConstructor
@Repository
public class ResumeQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<Resume> findAll(ResumeSearchCondition condition, Pageable pageable, User user) {
		List<OrderSpecifier> orders = QueryDslUtil.getAllOrderSpecifiers(pageable, resume);

		JPAQuery<Resume> query = queryFactory
			.selectDistinct(resume)
			.from(resume)
			.leftJoin(resume.member, member).fetchJoin()
			.leftJoin(resume.applies, apply).fetchJoin()
			.where(
				resume.member.id.eq(user.getId()),
				eqOpen(condition.getOpen()),
				containsTitle(condition.getTitle())
			);

		List<Resume> content = query
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch();

		return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
	}

	private BooleanExpression eqOpen(Open open) {
		return ObjectUtils.isEmpty(open) ? null : resume.open.eq(open);
	}

	private BooleanExpression containsTitle(String title) {
		return !StringUtils.hasText(title) ? null : resume.title.contains(title);
	}
}
