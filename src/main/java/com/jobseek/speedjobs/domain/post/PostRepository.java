package com.jobseek.speedjobs.domain.post;

import com.jobseek.speedjobs.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findAllByFavoritesContains(User user, Pageable pageable);
}
