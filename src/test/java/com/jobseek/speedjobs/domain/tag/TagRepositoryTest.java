package com.jobseek.speedjobs.domain.tag;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class TagRepositoryTest {

	@Autowired
	private TagRepository tagRepository;

	@Test
	public void readByTagType() {
		List<Tag> all = tagRepository.findAllByType(Type.POSITION);
		for (Tag tag : all) {
			System.out.println(tag.getName());
			System.out.println(tag.getType());
		}
	}
}
