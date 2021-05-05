package com.jobseek.speedjobs.domain.resume;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplyRepository extends JpaRepository<Apply, Long> {

	List<Apply> findByResumeId(Long resumeId);

	List<Apply> findByRecruitId(Long recruitId);

	@Query("select a from Apply a where a.recruit.id=:recruitId and a.memberId=:memberId")
	Optional<Apply> findByRecruitAndMember(@Param("recruitId") Long recruitId, @Param("memberId") Long memberId);

}
