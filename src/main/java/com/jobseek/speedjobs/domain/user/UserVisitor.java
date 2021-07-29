package com.jobseek.speedjobs.domain.user;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.member.Member;

public interface UserVisitor<T> {

	T visitUser(User user);

	T visitMember(Member member);

	T visitCompany(Company company);
}
