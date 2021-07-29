package com.jobseek.speedjobs.service;

import com.jobseek.speedjobs.domain.message.Message;
import com.jobseek.speedjobs.domain.message.MessageRepository;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.message.MessageRequest;
import com.jobseek.speedjobs.dto.message.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatService {

	public static final String DESTINATION_PREFIX = "/channel/";

	private final MessageRepository messageRepository;
	private final RecruitService recruitService;
	private final UserService userService;
	private final SimpMessagingTemplate simpMessagingTemplate;

	@Transactional
	public Long save(MessageRequest request) {
		Recruit recruit = recruitService.getRecruit(request.getRoomId());
		User user = userService.getUser(request.getAuthorId());
		Message message = messageRepository.save(request.toEntity(user, recruit));
		simpMessagingTemplate.convertAndSend(DESTINATION_PREFIX + request.getRoomId(),
			MessageResponse.from(message));
		return message.getId();
	}

	public Page<MessageResponse> findAll(Long roomId, Pageable pageable) {
		return messageRepository.findAllByRecruitId(roomId, pageable)
			.map(MessageResponse::from);
	}

	public void delete(Long messageId) {
		messageRepository.deleteById(messageId);
	}
}
