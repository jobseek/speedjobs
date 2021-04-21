-- 테스트 비밀번호 : jobseek2021!
-- MEMBER
insert into users(email, password, name, provider, role)
values ('member@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '잡숙이', 'LOCAL', 'ROLE_MEMBER');

insert into members(birth, intro, nickname, sex, user_id)
values ('2021-04-20', '안녕하세요.', 'member', 'M', 1);

-- COMPANY
insert into users(email, password, name, provider, role)
values ('company@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '잡숙이', 'LOCAL', 'ROLE_COMPANY');

insert into companies(description, homepage, registration_number, company_name, logo_image, scale, user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67890', '(주)잡식', 'https://speedjobs.s3.ap-northeast-2.amazonaws.com/origin/8edbe2f6-9148-47fb-8549-efe1a6841d30.png', 6, 2);

-- ADMIN
insert into users(email, password, name, provider, role)
values ('admin@admin.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', 'admin', 'LOCAL', 'ROLE_ADMIN');

-- 직무 태그
insert into tags(name, type) values ('서버/백엔드', 'POSITION');
insert into tags(name, type) values ('프론트엔드', 'POSITION');
insert into tags(name, type) values ('웹 풀스택', 'POSITION');
insert into tags(name, type) values ('안드로이드 앱', 'POSITION');
insert into tags(name, type) values ('아이폰 앱', 'POSITION');
insert into tags(name, type) values ('머신러닝', 'POSITION');
insert into tags(name, type) values ('인공지능(AI)', 'POSITION');
-- insert into tags(name, type) values ('데이터 엔지니어', 'POSITION');
-- insert into tags(name, type) values ('모바일 게임', 'POSITION');
-- insert into tags(name, type) values ('게임 클라이언트', 'POSITION');
-- insert into tags(name, type) values ('게임 서버', 'POSITION');
-- insert into tags(name, type) values ('시스템/네트워크', 'POSITION');
-- insert into tags(name, type) values ('시스템 소프트웨어', 'POSITION');
-- insert into tags(name, type) values ('인터넷 보안', 'POSITION');
-- insert into tags(name, type) values ('QA', 'POSITION');
-- insert into tags(name, type) values ('사물인터넷(IoT)', 'POSITION');
-- insert into tags(name, type) values ('응용프로그램', 'POSITION');
-- insert into tags(name, type) values ('블록체인', 'POSITION');

-- 스킬 태그
insert into tags(name, type) values ('C', 'SKILL');
insert into tags(name, type) values ('C++', 'SKILL');
insert into tags(name, type) values ('C#', 'SKILL');
insert into tags(name, type) values ('Go', 'SKILL');
insert into tags(name, type) values ('Haskell', 'SKILL');
insert into tags(name, type) values ('Java', 'SKILL');
insert into tags(name, type) values ('Kotlin', 'SKILL');
insert into tags(name, type) values ('JavaScript', 'SKILL');
insert into tags(name, type) values ('TypeScript', 'SKILL');
-- insert into tags(name, type) values ('Objective-C', 'SKILL');
-- insert into tags(name, type) values ('Swift', 'SKILL');
-- insert into tags(name, type) values ('JSP', 'SKILL');
-- insert into tags(name, type) values ('PHP', 'SKILL');
-- insert into tags(name, type) values ('ASP.net', 'SKILL');
-- insert into tags(name, type) values ('Python', 'SKILL');
-- insert into tags(name, type) values ('Django', 'SKILL');
-- insert into tags(name, type) values ('R', 'SKILL');
-- insert into tags(name, type) values ('Ruby', 'SKILL');
-- insert into tags(name, type) values ('Rust', 'SKILL');
-- insert into tags(name, type) values ('Visual Basic', 'SKILL');
-- insert into tags(name, type) values ('HTML/CSS', 'SKILL');
-- insert into tags(name, type) values ('SQL', 'SKILL');
-- insert into tags(name, type) values ('NoSQL', 'SKILL');
-- insert into tags(name, type) values ('JPA', 'SKILL');
-- insert into tags(name, type) values ('Sequelize', 'SKILL');
-- insert into tags(name, type) values ('Node.js', 'SKILL');
-- insert into tags(name, type) values ('React.js', 'SKILL');
-- insert into tags(name, type) values ('Vue.js', 'SKILL');
-- insert into tags(name, type) values ('Angular.js', 'SKILL');
-- insert into tags(name, type) values ('Svelte.js', 'SKILL');
-- insert into tags(name, type) values ('Flutter', 'SKILL');
-- insert into tags(name, type) values ('jQuery', 'SKILL');
-- insert into tags(name, type) values ('React Native', 'SKILL');
-- insert into tags(name, type) values ('Spring MVC', 'SKILL');
-- insert into tags(name, type) values ('Spring boot', 'SKILL');
-- insert into tags(name, type) values ('ElasticSearch', 'SKILL');
