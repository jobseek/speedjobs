package com.jobseek.speedjobs.utils;

import java.io.StringWriter;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MailUtil {

	public static final String REGISTER_FILENAME = "register.html";
	public static final String APPROVAL_FILENAME = "approval.html";

	private final VelocityEngine velocityEngine; // 템플릿 엔진
	private final JavaMailSender javaMailSender;

	public void sendMail(String address, String fileName, String src) {
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			message.setSubject("[speedjobs]회원가입");
			message.setRecipient(RecipientType.TO, new InternetAddress(address));
			Template template = velocityEngine
				.getTemplate("./src/main/resources/templates/" + fileName, "UTF-8");
			VelocityContext context = new VelocityContext();
			context.put("src", src);
			StringWriter writer = new StringWriter();
			template.merge(context, writer);
			message.setText(writer.toString(), "UTF-8", "html");
			javaMailSender.send(message);
		} catch (MessagingException | MailException e) {
			e.printStackTrace();
		}
	}

}
