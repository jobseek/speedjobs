package com.jobseek.speedjobs.domain.tag;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

	List<PostTag> findByTagId(Long id);
}
