package com.jobseek.speedjobs.config.auth;

import com.jobseek.speedjobs.domain.member.Member;
import com.jobseek.speedjobs.domain.user.Provider;
import java.util.Map;

import com.jobseek.speedjobs.common.exception.OAuth2RegistrationException;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class OAuthAttributes {

	private final Map<String, Object> attributes;
	private final String nameAttributeKey;
	private final String oauthId;
	private final String name;
	private final String email;
	private final String picture;
	private final Provider provider;

	@Builder
	public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email,
		String picture, Provider provider, String oauthId) {
		this.attributes = attributes;
		this.nameAttributeKey = nameAttributeKey;
		this.oauthId = oauthId;
		this.name = name;
		this.email = email;
		this.picture = picture;
		this.provider = provider;
	}

	public static OAuthAttributes of(String registrationId, String userNameAttributeName,
		Map<String, Object> attributes) {
		if ("naver".equalsIgnoreCase(registrationId)) {
			return ofNaver("id", attributes);
		} else if ("github".equalsIgnoreCase(registrationId)) {
			return ofGithub(userNameAttributeName, attributes);
		} else if ("kakao".equals(registrationId)) {
			return ofKakao(userNameAttributeName, attributes);
		} else if ("google".equalsIgnoreCase(registrationId)){
			return ofGoogle(userNameAttributeName, attributes);
		} else {
			throw new OAuth2RegistrationException();
		}
	}

	@SuppressWarnings("unchecked")
	private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
		Map<String, Object> response = (Map<String, Object>) attributes.get("response");
		return OAuthAttributes.builder()
			.oauthId((String) response.get("id"))
			.name((String) response.get("name"))
			.email((String) response.get("email"))
			.picture((String) response.get("profile_image"))
			.provider(Provider.NAVER)
			.attributes(response)
			.nameAttributeKey(userNameAttributeName)
			.build();
	}

	private static OAuthAttributes ofGithub(String userNameAttributeName, Map<String, Object> attributes) {
		String name = attributes.get("name") == null ? "login" : "name";
		return OAuthAttributes.builder()
			.oauthId(attributes.get(userNameAttributeName).toString())
			.name((String)attributes.get(name))
			.email((String)attributes.get("email"))
			.picture((String)attributes.get("avatar_url"))
			.provider(Provider.GITHUB)
			.attributes(attributes)
			.nameAttributeKey(userNameAttributeName)
			.build();
	}

	@SuppressWarnings("unchecked")
	private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
		Map<String,Object> account = (Map<String, Object>) attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>) account.get("profile");
		return OAuthAttributes.builder()
			.oauthId(attributes.get(userNameAttributeName).toString())
			.name((String)profile.get("nickname"))
			.email((String)account.get("email"))
			.picture((String)profile.get("profile_image_url"))
			.provider(Provider.KAKAO)
			.attributes(attributes)
			.nameAttributeKey(userNameAttributeName)
			.build();
	}

	private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
		return OAuthAttributes.builder()
			.oauthId((String)attributes.get(userNameAttributeName))
			.name((String)attributes.get("name"))
			.email((String)attributes.get("email"))
			.picture((String)attributes.get("picture"))
			.provider(Provider.GOOGLE)
			.attributes(attributes)
			.nameAttributeKey(userNameAttributeName)
			.build();
	}

	public User toEntity() {
		User user = User.builder()
			.name(name)
			.email(email)
			.picture(picture)
			.role(Role.ROLE_MEMBER)
			.provider(provider)
			.oauthId(oauthId)
			.build();
		user.setMember(Member.builder().build());
		return user;
	}
}
