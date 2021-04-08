package com.jobseek.speedjobs.utils;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RedisUtil {

	private final RedisTemplate<String, Object> redisTemplate;

	public void set(String key, Object value, long milliseconds) {
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(value.getClass()));
		redisTemplate.opsForValue().set(key, value, milliseconds, TimeUnit.MILLISECONDS);
	}

	public Object get(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public Boolean delete(String key) {
		return redisTemplate.delete(key);
	}

	public Boolean hasKey(String key) {
		return redisTemplate.hasKey(key);
	}
}
