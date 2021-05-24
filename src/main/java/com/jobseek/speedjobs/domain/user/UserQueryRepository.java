package com.jobseek.speedjobs.domain.user;

import static com.jobseek.speedjobs.domain.user.QUser.user;
import static com.jobseek.speedjobs.util.QueryDslUtil.getAllOrderSpecifiers;

import com.jobseek.speedjobs.dto.user.UserSearchCondition;
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
public class UserQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<User> findAll(UserSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable, user);

		JPAQuery<User> query = queryFactory
			.selectDistinct(user)
			.from(user)
			.where(
				containsName(condition.getName()),
				containsNickname(condition.getNickname()),
				containsEmail(condition.getEmail()),
				eqRole(condition.getRole())
			);

		List<User> content = query
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch();

		return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
	}

	private BooleanExpression containsName(String name) {
		return !StringUtils.hasText(name) ? null : user.name.contains(name);
	}

	private BooleanExpression containsNickname(String nickname) {
		return !StringUtils.hasText(nickname) ? null : user.nickname.contains(nickname);
	}

	private BooleanExpression containsEmail(String email) {
		return !StringUtils.hasText(email) ? null : user.email.contains(email);
	}

	private BooleanExpression eqRole(Role role) {
		return ObjectUtils.isEmpty(role) ? null : user.role.eq(role);
	}

}
