package com.jobseek.speedjobs.domain.post;

import static com.jobseek.speedjobs.domain.post.QPost.post;
import static com.jobseek.speedjobs.domain.tag.QTag.tag;
import static com.jobseek.speedjobs.domain.user.QUser.user;
import static com.jobseek.speedjobs.utils.QueryDslUtil.getAllOrderSpecifiers;

import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<Post> findAll(PostSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable, post);
		List<Post> content = queryFactory
			.selectFrom(post)
			.leftJoin(post.tags, tag)
			.leftJoin(post.user, user)
			.where(
				containsTagIds(condition.getTagIds()),
				containsAuthor(condition.getAuthor()),
				containTitle(condition.getTitle()),
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
				containsTagIds(condition.getTagIds()),
				containsAuthor(condition.getAuthor()),
				containTitle(condition.getTitle()),
				containContent(condition.getContent())
			);
		return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
	}

	private BooleanExpression containsTagIds(List<Long> tagIds) {
		return (tagIds == null) ? null : post.tags.any().id.in(tagIds);
	}

	private BooleanExpression containsAuthor(String author) {
		return !StringUtils.hasText(author) ? null : post.user.nickname.contains(author);
	}

	private BooleanExpression containTitle(String title) {
		return !StringUtils.hasText(title) ? null : post.title.contains(title);
	}

	private BooleanExpression containContent(String content) {
		return !StringUtils.hasText(content) ? null : post.postDetail.content.contains(content);
	}
}
