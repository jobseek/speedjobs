-- 테스트 비밀번호 : jobseek2021!

-- MEMBER
insert into users(email, password, name, nickname, role)
values ('member@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '김건목', '김건목',
        'ROLE_MEMBER'); -- 1
insert into users(email, password, name, nickname, role)
values ('test1@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '김진호', '김진호',
        'ROLE_MEMBER'); -- 2
insert into users(email, password, name, nickname, role)
values ('test2@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '이승기', '이승기',
        'ROLE_MEMBER'); -- 3
insert into users(email, password, name, nickname, role)
values ('test3@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '갓카오', '갓카오',
        'ROLE_MEMBER'); -- 4
insert into users(email, password, name, nickname, role)
values ('test4@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '김성원', '김성원',
        'ROLE_MEMBER'); -- 5
insert into users(email, password, name, nickname, role)
values ('test5@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '이중복', '이중복',
        'ROLE_MEMBER'); -- 6
insert into users(email, password, name, nickname, role)
values ('test6@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '이은혜', '이은혜',
        'ROLE_MEMBER'); -- 7
insert into users(email, password, name, nickname, role)
values ('test7@member.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '울랄라', '울랄라',
        'ROLE_MEMBER'); -- 8

insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1992-05-30', '안녕하세요. 반갑습니다', 'M', null, 'LOCAL', 1);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1994-02-18', '안녕하세요. 짱우진입니다', 'M', null, 'LOCAL', 2);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('2000-03-03', '저는 가수입니다.', 'M', null, 'LOCAL', 3);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1983-10-21', '여성개발자입니다 갓카오짱', 'F', null, 'LOCAL', 4);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1998-04-05', '안녕하세요.', 'M', null, 'LOCAL', 5);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1966-03-03', '안녕하세요.', 'M', null, 'LOCAL', 6);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('2001-01-10', '안녕하세요.', 'F', null, 'LOCAL', 7);
insert into members(birth, bio, gender, oauth_id, provider, user_id)
values ('1997-08-20', '안녕하세요.', 'M', null, 'LOCAL', 8);

-- COMPANY
insert into users(email, password, name, nickname, role)
values ('company@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq',
        '배달의민족', '배달의민족', 'ROLE_COMPANY'); -- 9
insert into users(email, password, name, nickname, role)
values ('test1@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '네이버', '네이버',
        'ROLE_COMPANY'); -- 10
insert into users(email, password, name, nickname, role)
values ('test2@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '카카오', '카카오',
        'ROLE_COMPANY'); -- 11
insert into users(email, password, name, nickname, role)
values ('test3@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '라인', '라인',
        'ROLE_COMPANY'); -- 12
insert into users(email, password, name, nickname, role)
values ('test4@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '쿠팡', '쿠팡',
        'ROLE_COMPANY'); -- 13
insert into users(email, password, name, nickname, role)
values ('test5@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '토스', '토스',
        'ROLE_COMPANY'); -- 14
insert into users(email, password, name, nickname, role)
values ('test6@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '라인', '라인',
        'ROLE_COMPANY'); -- 15
insert into users(email, password, name, nickname, role)
values ('test7@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '구글코리아',
        '구글코리아', 'ROLE_COMPANY'); -- 16

insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67890', '(주)잡식',
        'https://speedjobs.s3.ap-northeast-2.amazonaws.com/origin/8edbe2f6-9148-47fb-8549-efe1a6841d30.png',
        6, 9);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67891', '(주)잡식1', null, 6, 10);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67892', '(주)잡식2', null, 6, 11);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67893', '(주)잡식3', null, 6, 12);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67894', '(주)잡식4', null, 6, 13);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67895', '(주)잡식5', null, 6, 14);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67896', '(주)잡식6', null, 6, 15);
insert into companies(description, homepage, registration_number, company_name, logo_image, scale,
                      user_id)
values ('잡식컴퍼니입니다.', 'jobseek@jobseek.com', '123-45-67897', '(주)잡식7', null, 6, 16);

-- ADMIN
insert into users(email, password, name, nickname, role)
values ('admin@admin.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', 'admin', '관리자',
        'ROLE_ADMIN');
-- 7

-- 직무 태그
insert into tags(name, type)
values ('서버/백엔드', 'POSITION');
insert into tags(name, type)
values ('프론트엔드', 'POSITION');
insert into tags(name, type)
values ('웹 풀스택', 'POSITION');
insert into tags(name, type)
values ('안드로이드 앱', 'POSITION');
insert into tags(name, type)
values ('아이폰 앱', 'POSITION');
insert into tags(name, type)
values ('머신러닝', 'POSITION');
insert into tags(name, type)
values ('인공지능(AI)', 'POSITION');
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
insert into tags(name, type)
values ('C', 'SKILL');
insert into tags(name, type)
values ('C++', 'SKILL');
insert into tags(name, type)
values ('C#', 'SKILL');
insert into tags(name, type)
values ('Go', 'SKILL');
insert into tags(name, type)
values ('Haskell', 'SKILL');
insert into tags(name, type)
values ('Java', 'SKILL');
insert into tags(name, type)
values ('Kotlin', 'SKILL');
insert into tags(name, type)
values ('JavaScript', 'SKILL');
insert into tags(name, type)
values ('TypeScript', 'SKILL');
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

-- POST
insert into posts (created_date, modified_date, content, title, user_id,
                   view_count)
values ('2020-01-03 11:13:00', '2020-01-20 11:15:00',
        '안녕하세요.\n 개발자 신입이 되려고 준비하는 학생입니다.\n Java, Python, Javascript 요 세가지를 공부하고 있는데요 이것들과 연동되는 데이터베이스가 뭔지 알려주세요. MongoDB나 MySQL있는것 같은데 어떤 언어가 어떤 데이터베이스와 연동이 되는지 연결해주실수있나요?\n 또 MongoDB는 SQL의 문법과 많이 다른가요?',
        '데이터베이스의 종류를 알고싶어요', 1, 20);
insert into posts (created_date, modified_date, content, title, user_id,
                   view_count)
values ('2020-01-03 11:13:00', '2020-01-20 11:15:00',
        '둘의 차이가 스프링부트가 설정이 더 쉽다 이게 가장 큰 차이인가요? gradle 과 메이븐의 차이는 별로없는건가요.... 스프링 개발자가 스프링부트를 공부할때 러닝커브는 어느정도 될까요?',
        '스프링과 스프링부트의 차이', 3, 10);
insert into posts (created_date, modified_date, content, title, user_id,
                   view_count)
values ('2020-01-03 11:13:00', '2020-01-20 11:15:00',
        '둘의 차이가 스프링부트가 설정이 더 쉽다 이게 가장 큰 차이인가요? gradle 과 메이븐의 차이는 별로없는건가요.... 스프링 개발자가 스프링부트를 공부할때 러닝커브는 어느정도 될까요?',
        'iBatis와 MyBatis의 차이점', 3, 5);

-- POST_TAGS
insert into post_tags (created_date, modified_date, post_id, tag_id)
values ('2021-04-22 11:13:00', '2021-04-22 11:13:00', 1, 1);
insert into post_tags (created_date, modified_date, post_id, tag_id)
values ('2021-04-22 11:13:00', '2021-04-22 11:13:00', 1, 2);
insert into post_tags (created_date, modified_date, post_id, tag_id)
values ('2021-04-22 11:13:00', '2021-04-22 11:13:00', 2, 5);
insert into post_tags (created_date, modified_date, post_id, tag_id)
values ('2021-04-22 11:13:00', '2021-04-22 11:13:00', 2, 8);

-- COMMENT
insert into comments (comment_id, created_date, modified_date, content, post_id, user_id)
values (1, '2020-04-22 15:01:40', '2020-04-22 15:01:40',
        '언어랑 DB랑은 연동여부는 관련 없습니다. (아주 없는건 아니지만요...)\n 해당 언어에서 DB와 연결할 수 있는 Driver만 제공되면 어느 언어든 연동 가능합니다. \n 자바나 파이썬, Javascript (Node 겠죠?) 모두 메이저 언어이기 때문에 어지간한 DB 벤더사에서 이미 드라이버 잘 만들어놓았고, DB 커넥션을 쉽게할 수 있도록 잘 래핑한 모듈들도 많이 때문에 어렵지않게 연동 가능합니다.',
        1, 2);
insert into comments (comment_id, created_date, modified_date, content, post_id, user_id)
values (2, '2021-04-22 15:01:40', '2021-04-22 15:01:40', 'Mongdb는 nosql입니다. 많이 다르죠', 1, 3);
insert into comments (comment_id, created_date, modified_date, content, post_id, user_id)
values (3, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        '스프링개발자가 스프링부트를 공부할때 러닝커브 하루정도입니다.(당장 실무에 적용한다는 기준.. ) 설정이 간편해졌다 이정도입니다. 그냥 레퍼런스도큐먼트만 쭉 정독해보시면됩니다.',
        2, 1);
insert into comments (comment_id, created_date, modified_date, content, post_id, user_id)
values (4, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        '음. 간단하게 기본 스프링 관련된거 많이 사용되는 라이브러리 같은걸 쉽게 메이븐에 넣엇다 뺏다 할수있구요 내장으로 톰캣 같은게 있어서 개발시 서버도 쉽게 띄울수있구요. 이런저런 설정 스프링 설정 이라던가 톰캣 설정을 하나의 프로퍼티파일로 관리 가능합니다.',
        2, 3);

-- -- RECRUIT
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 4, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 4, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 4, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 4, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 5, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 5, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 5, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 6, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--  insert into recruits (created_date, modified_date, close_date, company_id, like_count, open_date, content, experience, position, status, thumbnail, title, view_count) values ('2021-04-22 12:17:11', '2021-04-22 12:17:11', '2021-12-15T00:00:00.000+0900', 6, 0, '2020-01-02T00:00:00.000+0900', '모집합니다아', 'JUNIOR', 'PERMANENT', 'PROCESS', 'Empty', '제목입니당', 0);
--
--  insert into recruit_tags (created_date, modified_date, recruit_id, tag_id) values ('2021-04-22T12:17:11.404+0900', '2021-04-22T12:17:11.404+0900', 3, 1);
