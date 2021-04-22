package com.jobseek.speedjobs.domain.post;

import java.util.Collection;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

	List<Post> findAllByUserId(Long id);

	@Query("SELECT p FROM Post p ORDER BY p.id DESC")
	List<Post> findAllDesc();
}
