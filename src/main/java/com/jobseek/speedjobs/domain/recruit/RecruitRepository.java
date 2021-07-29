package com.jobseek.speedjobs.domain.recruit;

import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitRepository extends JpaRepository<Recruit, Long> {

	List<Recruit> findAllByStatusAndOpenDateBefore(Status status, LocalDateTime now);

	List<Recruit> findAllByStatusAndCloseDateBefore(Status status, LocalDateTime now);

	Page<Recruit> findAllByFavoritesContains(User user, Pageable pageable);
}
