package com.jobseek.speedjobs.domain.member;

import com.jobseek.speedjobs.domain.user.Provider;
import com.jobseek.speedjobs.domain.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByProviderAndOauthId(Provider provider, String oauthId);
}
