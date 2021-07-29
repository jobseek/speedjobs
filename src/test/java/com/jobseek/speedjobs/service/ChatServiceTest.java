package com.jobseek.speedjobs.service;

import static com.jobseek.speedjobs.domain.user.Role.ROLE_COMPANY;
import static com.jobseek.speedjobs.domain.user.Role.ROLE_MEMBER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jobseek.speedjobs.domain.company.Company;
import com.jobseek.speedjobs.domain.company.CompanyDetail;
import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.message.MessageRepository;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.RecruitDetail;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.message.MessageRequest;
import com.jobseek.speedjobs.dto.message.MessageResponse;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@ExtendWith(MockitoExtension.class)
class ChatServiceTest {

	private Message message;
	private Company company;
	private Recruit recruit;
	private User user;

	private ChatService chatService;

	@Mock
	private MessageRepository messageRepository;

	@Mock
	private RecruitService recruitService;

	@Mock
	private UserService userService;

	@Mock
	private SimpMessagingTemplate simpMessagingTemplate;

	@BeforeEach
	void setUp() {
		chatService = new ChatService(messageRepository, recruitService, userService,
			simpMessagingTemplate);

		company = Company.builder()
			.id(1L)
			.companyName("구글")
			.role(ROLE_COMPANY)
			.companyDetail(CompanyDetail.builder().build())
			.build();
		recruit = Recruit.builder()
			.id(1L)
			.title("백엔드 모집")
			.openDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.closeDate(LocalDateTime.of(9999, 1, 1, 1, 1))
			.experience(3)
			.recruitDetail(RecruitDetail.from(Position.PERMANENT, "선착순 10명"))
			.company(company)
			.build();
		user = User.builder()
			.id(1L)
			.role(ROLE_MEMBER)
			.build();
		message = Message.builder()
			.id(1L)
			.user(user)
			.recruit(recruit)
			.content("안녕하세요.")
			.build();
	}

	@DisplayName("메시지 등록")
	@Test
	void save() {
		MessageRequest request = MessageRequest.builder()
			.authorId(message.getUser().getId())
			.roomId(message.getRecruit().getId())
			.content(message.getContent())
			.build();
		given(recruitService.getRecruit(any())).willReturn(recruit);
		given(userService.getUser(any())).willReturn(user);
		given(messageRepository.save(any(Message.class))).willReturn(message);
		doNothing().when(simpMessagingTemplate).convertAndSend(any(), any(MessageResponse.class));

		Long id = chatService.save(request);

		assertEquals(1L, id);
	}

	@DisplayName("메시지 전체 조회")
	@Test
	void findAll() {
		given(messageRepository.findAllByRecruitId(any(), any()))
			.willReturn(new PageImpl<>(List.of(message)));

		Page<MessageResponse> responses = chatService.findAll(1L, Pageable.unpaged());

		assertEquals(1, responses.getTotalElements());
	}

	@DisplayName("메시지 삭제")
	@Test
	void delete() {
		doNothing().when(messageRepository).deleteById(message.getId());

		chatService.delete(1L);

		verify(messageRepository, times(1)).deleteById(message.getId());
	}
}
