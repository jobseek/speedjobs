package com.jobseek.speedjobs.domain.corporation;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Enumerated;

@Embeddable
@Getter
public class CorporationDetail {

	private String corpNumber;

	private String description;

	private String employeeNumber;

	private String homePage;

}
