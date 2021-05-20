package com.jobseek.speedjobs.domain.banner;

import static lombok.AccessLevel.PROTECTED;

import com.jobseek.speedjobs.domain.BaseTimeEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@Table(name = "banners")
public class Banner extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "banner_id")
	private Long id;

	private String baseName;

	private String extension;

	private String url;

	@Builder
	public Banner(Long id, String baseName, String extension, String url) {
		this.id = id;
		this.baseName = baseName;
		this.extension = extension;
		this.url = url;
	}

	public void changeExtension(String extension) {
		this.extension = extension;
	}
}
