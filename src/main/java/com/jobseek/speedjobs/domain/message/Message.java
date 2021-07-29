package com.jobseek.speedjobs.domain.message;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.common.exception.IllegalParameterException;
import com.jobseek.speedjobs.domain.BaseTimeEntity;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "messages")
public class Message extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "message_id")
	private Long id;

	@Lob
	private String content;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = LAZY, cascade = {PERSIST, MERGE})
	@JoinColumn(name = "recruit_id")
	private Recruit recruit;

	@Builder
	private Message(Long id, String content, User user, Recruit recruit) {
		validateParams(content, user, recruit);
		this.id = id;
		this.content = content;
		this.user = user;
		this.recruit = recruit;
	}

	private void validateParams(String content, User user, Recruit recruit) {
		if (ObjectUtils.anyNull(user, recruit) || StringUtils.isBlank(content)) {
			throw new IllegalParameterException();
		}
	}
}
