package com.jobseek.speedjobs.utils;

import java.io.StringWriter;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Slf4j
@RequiredArgsConstructor
@Component
public class MailUtil {

	private final JavaMailSender javaMailSender;

	public void sendEmail(String email, String key) {
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			VelocityEngine velocityEngine = new VelocityEngine();
			message.setSubject("[speedjobs] 가입완료를 위해 이메일 인증을 해주세요.");
			message.setRecipient(RecipientType.TO, new InternetAddress(email));
			Template template = velocityEngine
				.getTemplate("./src/main/resources/templates/email.html", "UTF-8");
			VelocityContext context = new VelocityContext();
			context.put("src", "http://localhost:8081/api/user/signup/confirm/" + key);
			StringWriter writer = new StringWriter();
			template.merge(context, writer);
			message.setText(writer.toString(), "UTF-8", "html");
			javaMailSender.send(message);
		} catch (MessagingException | MailException e) {
			e.printStackTrace();
		}
	}

}
