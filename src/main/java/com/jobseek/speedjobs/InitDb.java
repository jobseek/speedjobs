//package com.jobseek.speedjobs;
//
//import com.jobseek.speedjobs.domain.tag.Tag;
//import com.jobseek.speedjobs.domain.tag.Type;
//import java.util.ArrayList;
//import java.util.List;
//import javax.annotation.PostConstruct;
//import javax.persistence.EntityManager;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//@Component
//@RequiredArgsConstructor
//public class InitDb {
//
//	private final InitService initService;
//
//	@PostConstruct
//	public void init() {
//		initService.dbInitPositionTag();
//		initService.dbInitSkillTag();
//	}
//
//	@Component
//	@Transactional
//	@RequiredArgsConstructor
//	static class InitService {
//
//		private final EntityManager em;
//
//		public void dbInitPositionTag() {
//			List<Tag> tagList = new ArrayList<>();
//			tagList.add(createTag(Type.POSITION, "서버/백엔드"));
//			tagList.add(createTag(Type.POSITION, "프론트엔드"));
//			tagList.add(createTag(Type.POSITION, "웹 풀스택"));
//			tagList.add(createTag(Type.POSITION, "안드로이드 앱"));
//			tagList.add(createTag(Type.POSITION, "아이폰 앱"));
//			tagList.add(createTag(Type.POSITION, "머신러닝"));
//			tagList.add(createTag(Type.POSITION, "인공지능(AI)"));
//			tagList.add(createTag(Type.POSITION, "데이터 엔지니어"));
//			tagList.add(createTag(Type.POSITION, "모바일 게임"));
//			tagList.add(createTag(Type.POSITION, "게임 클라이언트"));
//			tagList.add(createTag(Type.POSITION, "게임 서버"));
//			tagList.add(createTag(Type.POSITION, "시스템/네트워크"));
//			tagList.add(createTag(Type.POSITION, "시스템 소프트웨어"));
//			tagList.add(createTag(Type.POSITION, "인터넷 보안"));
//			tagList.add(createTag(Type.POSITION, "QA"));
//			tagList.add(createTag(Type.POSITION, "사물인터넷(IoT)"));
//			tagList.add(createTag(Type.POSITION, "응용프로그램"));
//			tagList.add(createTag(Type.POSITION, "블록체인"));
//			for (Tag tag : tagList) {
//				em.persist(tag);
//			}
//		}
//
//		public void dbInitSkillTag() {
//			List<Tag> tagList = new ArrayList<>();
//			tagList.add(createTag(Type.SKILL, "C"));
//			tagList.add(createTag(Type.SKILL, "C++"));
//			tagList.add(createTag(Type.SKILL, "C#"));
//			tagList.add(createTag(Type.SKILL, "Go"));
//			tagList.add(createTag(Type.SKILL, "Haskell"));
//			tagList.add(createTag(Type.SKILL, "Java"));
//			tagList.add(createTag(Type.SKILL, "Kotlin"));
//			tagList.add(createTag(Type.SKILL, "JavaScript"));
//			tagList.add(createTag(Type.SKILL, "TypeScript"));
//			tagList.add(createTag(Type.SKILL, "Objective-C"));
//			tagList.add(createTag(Type.SKILL, "Swift"));
//			tagList.add(createTag(Type.SKILL, "JSP"));
//			tagList.add(createTag(Type.SKILL, "PHP"));
//			tagList.add(createTag(Type.SKILL, "ASP.net"));
//			tagList.add(createTag(Type.SKILL, "Python"));
//			tagList.add(createTag(Type.SKILL, "Django"));
//			tagList.add(createTag(Type.SKILL, "R"));
//			tagList.add(createTag(Type.SKILL, "Ruby"));
//			tagList.add(createTag(Type.SKILL, "Rust"));
//			tagList.add(createTag(Type.SKILL, "Visual Basic"));
//			tagList.add(createTag(Type.SKILL, "HTML/CSS"));
//			tagList.add(createTag(Type.SKILL, "SQL"));
//			tagList.add(createTag(Type.SKILL, "NoSQL"));
//			tagList.add(createTag(Type.SKILL, "JPA"));
//			tagList.add(createTag(Type.SKILL, "Sequelize"));
//			tagList.add(createTag(Type.SKILL, "Node.js"));
//			tagList.add(createTag(Type.SKILL, "React.js"));
//			tagList.add(createTag(Type.SKILL, "Vue.js"));
//			tagList.add(createTag(Type.SKILL, "Angular.js"));
//			tagList.add(createTag(Type.SKILL, "Svelte.js"));
//			tagList.add(createTag(Type.SKILL, "Flutter"));
//			tagList.add(createTag(Type.SKILL, "jQuery"));
//			tagList.add(createTag(Type.SKILL, "React Native"));
//			tagList.add(createTag(Type.SKILL, "Spring MVC"));
//			tagList.add(createTag(Type.SKILL, "Spring boot"));
//			tagList.add(createTag(Type.SKILL, "ElasticSearch"));
//			for (Tag tag : tagList) {
//				em.persist(tag);
//			}
//		}
//
//
//		private Tag createTag(Type type, String tagName) {
//			return new Tag(type, tagName);
//		}
//
//	}
//}
