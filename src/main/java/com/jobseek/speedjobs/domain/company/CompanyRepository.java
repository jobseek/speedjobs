package com.jobseek.speedjobs.domain.company;

import com.jobseek.speedjobs.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
