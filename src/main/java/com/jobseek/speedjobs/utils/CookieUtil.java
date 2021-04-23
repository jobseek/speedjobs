package com.jobseek.speedjobs.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

	public Cookie createCookie(String name, String value, int maxAge) {
		Cookie cookie = new Cookie(name, value);
		cookie.setHttpOnly(false);
		cookie.setMaxAge(maxAge);
		cookie.setPath("/");
		return cookie;
	}

	public Cookie getCookie(HttpServletRequest req, String name) {
		final Cookie[] cookies = req.getCookies();
		if (cookies == null) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(name)) {
				return cookie;
			}
		}
		return null;
	}

}
