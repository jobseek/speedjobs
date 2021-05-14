package com.jobseek.speedjobs.domain.company;

import static com.jobseek.speedjobs.domain.company.QCompany.company;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class CompanyQueryRepository {

	private final JPAQueryFactory queryFactory;

	public Boolean existsByCompanyNameOrRegistrationNumber(String companyName,
		String registrationNumber) {
		Integer fetchOne = queryFactory
			.selectOne()
			.from(company)
			.where(company.companyName.eq(companyName)
				.or(company.companyDetail.registrationNumber.eq(registrationNumber)))
			.fetchFirst();
		return fetchOne != null;
	}
}
