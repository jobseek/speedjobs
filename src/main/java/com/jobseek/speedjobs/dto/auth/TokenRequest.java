package com.jobseek.speedjobs.dto.auth;

import com.jobseek.speedjobs.domain.user.Provider;
import javax.validation.constraints.Email;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TokenRequest {

	@Email
	private String email;

	private String password;

	private Provider provider;

	private String oauthId;

	public void setProvider(Provider provider) {
		this.provider = provider;
	}
}
