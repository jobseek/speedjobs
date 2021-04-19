package com.jobseek.speedjobs.domain.tag;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TagRepository extends JpaRepository<Tag, Long> {

	List<Tag> findAllByType(Type type);

}
