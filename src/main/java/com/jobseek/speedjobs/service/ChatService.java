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
	public void saveMessage(MessageRequest messageRequest) {
		Recruit recruit = recruitService.findOne(messageRequest.getRoomId());
		User user = userService.findOne(messageRequest.getAuthorId());
		Message message = Message.of(messageRequest.getContent(), user, recruit);
		messageRepository.save(message);
		simpMessagingTemplate.convertAndSend(DESTINATION_PREFIX + messageRequest.getRoomId(),
			MessageResponse.from(message));
	}

	public Page<MessageResponse> findAll(Long roomId, Pageable pageable) {
		return messageRepository.findAllByRecruitId(roomId, pageable)
			.map(MessageResponse::from);
	}
}
