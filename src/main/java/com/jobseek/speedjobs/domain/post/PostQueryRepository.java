package com.jobseek.speedjobs.domain.post;

import static com.jobseek.speedjobs.domain.post.QPost.post;
import static com.jobseek.speedjobs.domain.tag.QTag.tag;
import static com.jobseek.speedjobs.domain.user.QUser.user;

import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import com.jobseek.speedjobs.utils.QueryDslUtil;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Slf4j
@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

	private final QueryDslUtil queryDslUtil;
	private final JPAQueryFactory queryFactory;

	public Page<Post> findAll(PostSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable);
		List<Post> content = queryFactory
			.selectFrom(post)
			.leftJoin(post.tags, tag)
			.leftJoin(post.user, user)
			.where(
				containTagIds(condition.getTagIds()),
				startsWithAuthorName(condition.getAuthor()),
				containContent(condition.getContent())
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch().stream().distinct().collect(Collectors.toList());

		JPAQuery<Post> countQuery = queryFactory
			.selectFrom(post)
			.leftJoin(post.tags, tag)
			.leftJoin(post.user, user)
			.where(
				containTagIds(condition.getTagIds()),
				startsWithAuthorName(condition.getAuthor()),
				containContent(condition.getContent())
			);
		return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
	}

	public Page<Post> findAll2(PostSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable);
		QueryResults<Post> results = queryFactory
			.selectFrom(post)
			.leftJoin(post.tags, tag)
			.leftJoin(post.user, user)
			.where(
				containTagIds(condition.getTagIds()),
				startsWithAuthorName(condition.getAuthor())
			)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetchResults();

		log.info("results - {}, ", results);

		List<Post> result = results.getResults();

		log.info("개수 - {}", result.size());

		long total = results.getTotal();
		return new PageImpl<>(result, pageable, total);
	}

	private BooleanExpression containTagIds(List<Long> tagIds) { //1, 2, 9, 14 => X
		return (tagIds == null) ? null : post.tags.any().id.in(tagIds);
	}

	private BooleanExpression startsWithAuthorName(String author) {
		return !StringUtils.hasText(author) ? null : post.user.nickname.startsWith(author);
	}

	private BooleanExpression containContent(String content) {
		return !StringUtils.hasText(content) ? null : post.postDetail.content.contains(content);
	}

	private BooleanExpression eqTagId(Long tagId) {
		if (tagId == 0) {
			return null;
		}
		return tag.id.eq(tagId);
	}

	private BooleanExpression eqAuthorId(Long authorId) {
		if (authorId == 0) {
			return null;
		}
		return user.id.eq(authorId);
	}

	private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {

		List<OrderSpecifier> orders = new ArrayList<>();

		for (Sort.Order order : pageable.getSort()) {
			Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
			OrderSpecifier<?> orderSpecifier = QueryDslUtil
				.getSortedColumn(direction, post, order.getProperty());
			orders.add(orderSpecifier);
		}

		return orders;
	}
}
