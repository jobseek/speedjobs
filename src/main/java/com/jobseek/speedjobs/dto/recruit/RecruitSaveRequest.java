package com.jobseek.speedjobs.dto.recruit;

import com.jobseek.speedjobs.domain.recruit.Experience;
import com.jobseek.speedjobs.domain.recruit.Position;
import com.jobseek.speedjobs.domain.recruit.Recruit;
import com.jobseek.speedjobs.domain.recruit.Status;
import com.jobseek.speedjobs.domain.user.User;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecruitSaveRequest {

	private Long userId;

	private String title;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	private Status state;

	private String thumbnail;

	private Experience experience; // 경력

	private Position position; // 고용 형태

	private String content;

	private Set<Long> tagIds;

}
