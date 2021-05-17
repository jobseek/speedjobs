package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@TestInstance(Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension.class)
class TagServiceTest {

	@Mock
	TagRepository tagRepository;

	TagService tagService = new TagService(tagRepository);

	@Test
	@DisplayName("서비스 생성 테스트")
	void createService() {
		assertNotNull(tagService);
	}

	@Test
	@DisplayName("태그 저장 테스트")
	void saveTest() {
		assertNotNull(tagService);

		Tag expected = Tag.builder()
			.id(1L)
			.type(Type.SKILL)
			.name("테스트 태그")
			.build();

		TagRequest tagRequest = TagRequest.builder()
			.tagType(Type.SKILL)
			.tagName("테스트 태그")
			.build();

		given(tagRepository.save(any(Tag.class))).willReturn(expected);

		Long saveTag = tagService.saveTag(tagRequest);
//		when(saveTag).thenReturn(1L);

		assertEquals(expected.getId(), saveTag);
		// 내부적으로 tagService.saveTag를 하면 tagRepository를 써서 저장하는데 tagRepository는 Mock이라
		// null 이 뜸

//		when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
//		when(tagRepository.save(tag)).thenReturn(tag);
//		assertEquals("테스트 태그", tagRepository.findById(1L).get().getName());
	}
}
