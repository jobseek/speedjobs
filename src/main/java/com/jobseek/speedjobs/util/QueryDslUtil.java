package com.jobseek.speedjobs.util;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.Expressions;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class QueryDslUtil {

	// 정렬 순서, 객체, 필드명을 입력 받아서 OrderSpecifier로 반환
	public static OrderSpecifier<?> getSortedColumn(Order order, Path<?> parent, String fieldName) {
		Path<Object> fieldPath = Expressions.path(Object.class, parent, fieldName);
		return new OrderSpecifier(order, fieldPath);
	}

	// 위에서 반환된 객체를 List로 만들어서 Pageable과 함께 정렬된 리스트를 반환
	public static List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable, Path<?> parent) {

		List<OrderSpecifier> orders = new ArrayList<>();

		for (Sort.Order order : pageable.getSort()) {
			Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
			OrderSpecifier<?> orderSpecifier = QueryDslUtil
				.getSortedColumn(direction, parent, order.getProperty());
			orders.add(orderSpecifier);
		}

		return orders;
	}
}
