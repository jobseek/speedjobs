package com.jobseek.speedjobs.domain.tag;

import java.util.List;
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
