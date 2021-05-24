package com.jobseek.speedjobs.event.handler;

import com.jobseek.speedjobs.event.ApproveMailEvent;
import com.jobseek.speedjobs.event.RegisterMailEvent;
import com.jobseek.speedjobs.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MailEventHandler {

	private final MailUtil mailUtil;

	@Value("${front-url}")
	private String frontUrl;

	@Value("${back-url}")
	private String backUrl;

	@Async
	@EventListener
	public void sendRegisteredMail(RegisterMailEvent event) {
		String src = backUrl + "/user/signup/confirm/" + event.getKey();
		mailUtil.sendMail(event.getEmail(), MailUtil.REGISTER_FILENAME, src);
	}

	@Async
	@EventListener
	public void sendApprovedMail(ApproveMailEvent event) {
		mailUtil.sendMail(event.getEmail(), MailUtil.APPROVAL_FILENAME, frontUrl);
	}
}
