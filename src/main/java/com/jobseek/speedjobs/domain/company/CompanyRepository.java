package com.jobseek.speedjobs.domain.company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

	boolean existsByCompanyNameOrCompanyDetail_RegistrationNumber(String companyName,
		String registrationNumber);
}
