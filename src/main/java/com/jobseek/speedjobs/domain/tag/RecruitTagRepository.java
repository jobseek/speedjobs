package com.jobseek.speedjobs.domain.tag;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitTagRepository extends JpaRepository<RecruitTag, Long> {
	List<RecruitTag> findByTagId(Long id);
}
