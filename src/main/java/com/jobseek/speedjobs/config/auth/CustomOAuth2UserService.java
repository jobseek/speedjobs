package com.jobseek.speedjobs.config.auth;

import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(request);

		String registrationId = request.getClientRegistration().getRegistrationId();
		String userNameAttributeName = request.getClientRegistration().getProviderDetails()
			.getUserInfoEndpoint().getUserNameAttributeName();

		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
			oAuth2User.getAttributes());

		User user = saveOrUpdate(attributes);

		return new DefaultOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
			attributes.getAttributes(),
			attributes.getNameAttributeKey());
	}

	private User saveOrUpdate(OAuthAttributes attributes) {
		User user = userRepository.findByProviderAndOauthId(attributes.getProvider(),
			attributes.getOauthId())
			.map(entity -> entity.updateOAuthUserInfo(attributes.getName(), attributes.getPicture()))
			.orElse(attributes.toEntity());

		return userRepository.save(user);
	}
}
