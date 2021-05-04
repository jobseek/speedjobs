package com.jobseek.speedjobs.domain.resume;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyRepository extends JpaRepository<Apply, Long> {

	List<Apply> findByResumeId(Long resumeId);

	List<Apply> findByRecruitId(Long recruitId);

}
