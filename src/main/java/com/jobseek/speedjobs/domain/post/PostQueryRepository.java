package com.jobseek.speedjobs.domain.post;

import static com.jobseek.speedjobs.domain.post.QPost.post;
import static com.jobseek.speedjobs.domain.tag.QTag.tag;
import static com.jobseek.speedjobs.domain.user.QUser.user;
import static com.jobseek.speedjobs.util.QueryDslUtil.getAllOrderSpecifiers;

import com.jobseek.speedjobs.dto.post.PostSearchCondition;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
public class PostQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Page<Post> findAll(PostSearchCondition condition, Pageable pageable) {
		List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable, post);

		JPAQuery<Post> query = queryFactory
			.selectDistinct(post)
			.from(post)
			.leftJoin(post.tags, tag).fetchJoin()
			.leftJoin(post.user, user).fetchJoin()
			.where(
				eqAuthorId(condition.getAuthorId()),
				containsTagIds(condition.getTagIds()),
				containsAuthor(condition.getAuthor()),
				afterCreatedDate(condition.getCreatedDate()),
				containsTitleOrContent(condition.getTitle(), condition.getContent())
			);

		List<Post> content = query
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orders.toArray(new OrderSpecifier[0]))
			.fetch();

		return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
	}

	private BooleanExpression eqAuthorId(Long authorId) {
		return ObjectUtils.isEmpty(authorId) ? null : post.user.id.eq(authorId);
	}

	private BooleanExpression containsTagIds(List<Long> tagIds) {
		return (tagIds == null) ? null : post.tags.any().id.in(tagIds);
	}

	private BooleanExpression containsAuthor(String author) {
		return !StringUtils.hasText(author) ? null : post.user.nickname.contains(author);
	}

	private BooleanExpression containsTitle(String title) {
		return !StringUtils.hasText(title) ? null : post.title.contains(title);
	}

	private BooleanExpression containsContent(String content) {
		return !StringUtils.hasText(content) ? null : post.postDetail.content.contains(content);
	}

	private BooleanExpression containsTitleOrContent(String title, String content) {
		if (StringUtils.hasText(title) && StringUtils.hasText(content)) {
			return Objects.requireNonNull(containsTitle(title)).or(containsContent(content));
		}
		return StringUtils.hasText(title) ? containsTitle(title) : containsContent(content);
	}

	private BooleanExpression afterCreatedDate(LocalDateTime createdDate) {
		return ObjectUtils.isEmpty(createdDate) ? null : post.createdDate.after(createdDate);
	}

}
