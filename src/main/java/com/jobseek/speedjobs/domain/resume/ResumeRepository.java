package com.jobseek.speedjobs.domain.resume;

import com.jobseek.speedjobs.domain.recruit.Recruit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
