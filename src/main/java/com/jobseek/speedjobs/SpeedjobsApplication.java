package com.jobseek.speedjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
public class SpeedjobsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpeedjobsApplication.class, args);
	}

}
