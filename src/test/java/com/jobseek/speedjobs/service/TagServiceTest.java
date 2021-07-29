package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagRequest;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.jobseek.speedjobs.dto.tag.TagResponses.TagResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

	private Tag tag1;
	private Tag tag2;

	private TagService tagService;

	@Mock
	private TagRepository tagRepository;

	@BeforeEach
	void setUp() {
		tagService = new TagService(tagRepository);

		tag1 = Tag.builder()
			.id(1L)
			.name("스프링")
			.type(Type.SKILL)
			.build();

		tag2 = Tag.builder()
			.id(2L)
			.name("백엔드")
			.type(Type.POSITION)
			.build();
	}

	@DisplayName("태그 등록")
	@Test
	void save() {
		TagRequest request = TagRequest.builder()
			.tagName("스프링")
			.tagType(Type.SKILL)
			.build();
		given(tagRepository.save(any(Tag.class))).willReturn(tag1);

		Long id = tagService.save(request);

		assertEquals(1L, id);
	}

	@DisplayName("태그 타입별 전체 조회")
	@Test
	void findAll() {
		List<Tag> tagList = List.of(tag1, tag2);
		given(tagRepository.findAll()).willReturn(tagList);

		TagResponses responses = tagService.findAll();

		Map<Type, List<TagResponse>> tags = responses.getTags();
		assertAll(
			() -> assertEquals(1L, tags.get(Type.SKILL).get(0).getId()),
			() -> assertEquals("스프링", tags.get(Type.SKILL).get(0).getName()),
			() -> assertEquals(2L, tags.get(Type.POSITION).get(0).getId()),
			() -> assertEquals("백엔드", tags.get(Type.POSITION).get(0).getName())
		);
	}

	@DisplayName("태그 삭제")
	@Test
	void delete() {
		given(tagRepository.findById(any())).willReturn(Optional.of(tag1));
		doNothing().when(tagRepository).delete(tag1);

		tagService.delete(1L);

		verify(tagRepository, times(1)).delete(tag1);
	}

	@DisplayName("태그 수정")
	@Test
	void update() {
		TagRequest request = TagRequest.builder()
			.tagName("프론트엔드")
			.tagType(Type.POSITION)
			.build();
		given(tagRepository.findById(any())).willReturn(Optional.of(tag1));

		Tag tag = tagService.update(1L, request);

		assertAll(
			() -> assertEquals(1L, tag.getId()),
			() -> assertEquals("프론트엔드", tag.getName()),
			() -> assertEquals(Type.POSITION, tag.getType())
		);
	}

	@DisplayName("태그 ID 조회")
	@Test
	void getTagsByIds() {
		given(tagRepository.findById(1L)).willReturn(Optional.of(tag1));
		given(tagRepository.findById(2L)).willReturn(Optional.of(tag2));

		List<Tag> tags = tagService.getTagsByIds(List.of(1L, 2L));

		assertAll(
			() -> assertEquals(1L, tags.get(0).getId()),
			() -> assertEquals(tag1.getName(), tags.get(0).getName()),
			() -> assertEquals(tag1.getType(), tags.get(0).getType()),
			() -> assertEquals(2L, tags.get(1).getId()),
			() -> assertEquals(tag2.getName(), tags.get(1).getName()),
			() -> assertEquals(tag2.getType(), tags.get(1).getType())
		);
	}
}
