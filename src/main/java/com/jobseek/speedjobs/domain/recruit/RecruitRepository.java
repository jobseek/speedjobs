package com.jobseek.speedjobs.domain.recruit;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecruitRepository extends JpaRepository<Recruit, Long> {

	@Query("SELECT r FROM Recruit r ORDER BY r.id DESC")
	List<Recruit> findAllDesc();
}
