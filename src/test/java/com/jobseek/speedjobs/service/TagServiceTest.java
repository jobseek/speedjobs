package com.jobseek.speedjobs.service;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.common.exception.NotFoundException;
import com.jobseek.speedjobs.domain.tag.Tag;
import com.jobseek.speedjobs.domain.tag.TagRepository;
import com.jobseek.speedjobs.domain.tag.Type;
import com.jobseek.speedjobs.dto.tag.TagRequest;
import com.jobseek.speedjobs.dto.tag.TagResponses;
import com.sun.tools.javac.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
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

	TagService tagService;

	@BeforeEach
	void setUp() {
		tagService = new TagService(tagRepository);
	}

	@DisplayName("서비스 생성 테스트")
	@Test
	void createService() {
		assertNotNull(tagService);
	}

	@DisplayName("태그 저장 테스트")
	@Test
	void saveTest() {
		// given
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

		// when
		Long savedTag = tagService.saveTag(tagRequest);

		// then
		assertAll(
			() -> assertNotNull(tagService),
			() -> assertEquals(expected.getId(), savedTag)
		);
	}

	@DisplayName("태그 수정 테스트")
	@Test
	void updateTest() {
		// given
		Long id = 2L;
		TagRequest tagRequest = TagRequest.builder()
			.tagType(Type.POSITION)
			.tagName("수정된 태그")
			.build();
		given(tagRepository.findById(anyLong())).willReturn(Optional.of(tagRequest.toEntity()));

		// when
		tagService.updateTag(id, tagRequest);

		// then
		assertAll(
			() -> assertNotNull(tagService),
			() -> verify(tagRepository).findById(eq(2L)),
			() -> assertEquals("수정된 태그", tagRepository.findById(2L).get().getName())
		);
	}

	@DisplayName("태그 삭제 테스트")
	@Test
	void deleteTest() {
		// given
		Tag expected = Tag.builder()
			.id(1L)
			.type(Type.SKILL)
			.name("테스트 태그")
			.build();
		given(tagRepository.findById(anyLong())).willReturn(Optional.of(expected));
		doNothing().when(tagRepository).deleteById(anyLong());

		// when
		tagService.deleteTag(1L);

		// then
		assertAll(
			() -> assertNotNull(tagService),
			() -> assertEquals(Type.SKILL, tagRepository.findById(1L).get().getType()),
			() -> verify(tagRepository).deleteById(eq(1L))
		);
	}

	@DisplayName("태그 전체 조회 테스트")
	@Test
	void readAll() {
		// given
		Tag t1 = Tag.builder()
			.id(1L)
			.type(Type.SKILL)
			.name("테스트 태그1")
			.build();
		Tag t2 = Tag.builder()
			.id(2L)
			.type(Type.SKILL)
			.name("테스트 태그2")
			.build();
		List<Tag> expected = List.of(t1, t2);
		given(tagRepository.findAll()).willReturn(expected);

		// when
		TagResponses tagResponses = tagService.findTagsByType();
		String name = tagResponses.getTags().get(Type.SKILL).get(0).getName();
		String name1 = tagResponses.getTags().get(Type.SKILL).get(1).getName();

		// then
		assertAll(
			() -> assertNotNull(tagService),
			() -> assertNotNull(tagResponses),
			() -> assertEquals("테스트 태그1", name),
			() -> assertEquals("테스트 태그2", name1)
		);
	}

	@DisplayName("없는 태그 id 조회 시 예외 발생")
	@Test
	void read_Invalid_Tag_id() {
		given(tagRepository.findById(anyLong()))
			.willThrow(new NotFoundException("존재하지 않는 태그입니다."));
		assertThrows(NotFoundException.class, () -> tagRepository.findById(99L));
	}

}
