-- 테스트 비밀번호 : jobseek2021!

-- MEMBER 짱우/이승기/이혜지/김성원/이충복/이은혜/김상호/유세진/최예린/김진혁/김동욱/김승현/한보라/김영현 => 총 15
insert into users (user_id, created_date, modified_date, contact, email, name, nickname, password,
                   picture, role)
values (1, '2021-02-06 17:23:02', null, '010-1342-3433', 'member@member.com', '김건목', '기술자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (2, '2021-02-13 17:23:13', null, '010-3432-3438', 'member2@member.com', '이장우', '실무자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (3, '2021-03-23 17:23:19', '2021-04-24 17:24:38', '010-3122-7754', 'member3@member.com',
        '이승기', '실세', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_MEMBER'),
       (4, '2021-04-16 03:23:25', null, '010-3486-4222', 'member4@member.com', '박지훈', '갓카오',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (5, '2021-02-02 17:23:35', '2021-04-03 17:24:43', '010-3777-9867', 'member5@member.com',
        '김성원', '배후자', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_MEMBER'),
       (6, '2021-02-13 18:23:40', null, '010-3422-3333', 'member6@member.com', '이중복', '암살자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (7, '2021-04-05 17:23:48', null, '010-6765-8440', 'member7@member.com', '이은혜', '고문관',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (8, '2021-01-02 17:23:53', '2021-02-21 17:24:47', '010-5555-9383', 'member8@member.com',
        '김상호', '전문가', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_MEMBER'),
       (9, '2021-04-02 17:23:58', null, '010-3499-0039', 'member9@member.com', '유세진', '킹메이커',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (10, '2021-03-16 17:24:02', null, '010-8876-7676', 'member10@member.com', '최예린', '방관자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (11, '2021-02-13 17:24:06', '2021-03-27 17:24:53', '010-3432-3424', 'member11@member.com',
        '김진혁', '무도가', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_MEMBER'),
       (12, '2021-04-07 17:24:12', null, '010-3222-2222', 'member12@member.com', '김동욱', '바리스타',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (13, '2021-01-26 17:24:16', '2021-02-22 17:25:01', '010-3333-8888', 'member13@member.com',
        '김승현', '복불러', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_MEMBER'),
       (14, '2021-01-29 17:24:22', null, '010-8695-9484', 'member14@member.com', '한보라', '지배자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (15, '2021-02-06 17:24:28', null, '010-3422-0393', 'member15@member.com', '김영현', '월급루팡',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_MEMBER'),
       (16, '2021-04-02 17:46:39', null, '010-5378-5628', 'company@company.com', '(주)잡식', '(주)잡식',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq',
        'https://speedjobs.s3.ap-northeast-2.amazonaws.com/origin/8edbe2f6-9148-47fb-8549-efe1a6841d30.png',
        'ROLE_COMPANY'),
       (17, '2021-04-06 17:46:46', null, '010-2816-4677', 'company17@company.com', '네이버', '네이버',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (18, '2021-03-24 17:46:49', null, '010-4462-1155', 'company18@company.com', '카카오', '카카오',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (19, '2021-02-22 17:46:53', null, '010-9758-2918', 'company19@company.com', '라인', '라인',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (20, '2021-01-24 17:46:57', '2021-04-24 17:47:49', '010-2499-6696', 'company20@company.com',
        '쿠팡', '쿠팡', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_COMPANY'),
       (21, '2021-03-09 17:47:00', null, '010-9242-1250', 'company21@company.com', '토스', '토스',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (22, '2021-03-27 17:47:08', null, '010-9739-8897', 'company22@company.com', '넷마블', '넷마블',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (23, '2021-04-07 17:47:13', null, '010-8291-6528', 'company23@company.com', '구글코리아', '구글코리아',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (24, '2021-03-24 17:47:17', null, '010-9804-9160', 'company24@company.com', '삼성전자', '삼성전자',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (25, '2021-01-29 17:47:21', null, '010-5606-1328', 'company25@company.com', '배달의민족', '배달의민족',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (26, '2021-02-03 17:47:24', '2021-03-19 17:48:48', '010-3785-4140', 'company26@company.com',
        'SK', 'SK', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_COMPANY'),
       (27, '2021-03-27 17:47:29', null, '010-1143-4564', 'company27@company.com', 'LG', 'LG',
        '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY'),
       (28, '2021-04-02 17:47:34', '2021-04-11 17:49:03', '010-4990-9073', 'company28@company.com',
        'KT', 'KT', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_COMPANY'),
       (29, '2021-02-28 17:47:38', null, '010-7531-6008', 'company29@company.com', 'NC SOFT',
        'NC SOFT', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_COMPANY'),
       (30, '2021-01-26 17:47:42', '2021-03-02 17:49:07', '010-6919-8734', 'company30@company.com',
        'NHN', 'NHN', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null,
        'ROLE_COMPANY');
# (31, '2021-01-26 17:47:42', '2021-03-02 17:49:07', '010-3134-8734', 'company31@company.com', 'KB Bank', 'KB Bank', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY');
# (32, '2021-01-26 17:47:42', '2021-03-02 17:49:07', '010-7373-8734', 'company32@company.com', 'Hana Bank', 'Hana Bank', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', null, 'ROLE_COMPANY');
insert into members (bio, birth, gender, oauth_id, provider, user_id)
values ('안녕하세요. 반갑습니다', '1992-05-30', 'M', null, 'LOCAL', 1),
       ('안녕하세요. 짱우진입니다', '1994-02-18', 'M', null, 'LOCAL', 2),
       ('저는 가수입니다.', '2000-03-03', 'M', null, 'LOCAL', 3),
       ('여성개발자입니다 갓카오짱', '1983-10-21', 'F', null, 'LOCAL', 4),
       ('안녕하세요.', '1998-04-05', 'M', null, 'LOCAL', 5),
       ('안녕하세요.', '1966-03-03', 'M', null, 'LOCAL', 6),
       ('안녕하세요.', '2001-01-10', 'F', null, 'LOCAL', 7),
       ('안녕하세요.', '1997-08-20', 'M', null, 'LOCAL', 8),
       ('안녕하세요.', '1997-08-20', 'F', null, 'LOCAL', 9),
       ('안녕하세요.', '1997-08-20', 'F', null, 'LOCAL', 10),
       ('안녕하세요.', '1997-08-20', 'M', null, 'LOCAL', 11),
       ('안녕하세요.', '1997-08-20', 'M', null, 'LOCAL', 12),
       ('안녕하세요.', '1997-08-20', 'M', null, 'LOCAL', 13),
       ('안녕하세요.', '1997-08-20', 'F', null, 'LOCAL', 14),
       ('안녕하세요.', '1997-08-20', 'F', null, 'LOCAL', 15);
-- COMPANY    카카오/라인/쿠팡/토스/넷마블/구글/삼성전자/배달의민족/SK/LG/KT/NC SOFT/NHN명 => 총 15명
insert into companies (description, homepage, registration_number, company_name, logo_image, scale,
                       user_id)
values ('잡식컴퍼니입니다.', null, '123-45-67890', '(주)잡식',
        'https://speedjobs.s3.ap-northeast-2.amazonaws.com/origin/8edbe2f6-9148-47fb-8549-efe1a6841d30.png',
        6, 16),
       ('네이버입니다.', 'www.naver.com', '123-45-67891', '네이버', null, 232, 17),
       ('카카오입니다.', 'www.daum.net', '123-45-67892', '카카오', null, 3, 18),
       ('라인입니다.', null, '123-45-67893', '라인', null, 43, 19),
       ('쿠팡입니다.', null, '123-45-67894', '쿠팡', null, 44, 20),
       ('Toss입니다.', null, '123-45-67895', '토스', null, 64, 21),
       ('라인입니다.', null, '123-45-67896', '넷마블', null, 744, 22),
       ('구글코리아입니다.', null, '123-45-67901', '구글코리아', null, 12, 23),
       ('또 하나의 가족입니다', null, '123-45-67902', '삼성전자', null, 34, 24),
       ('단군의 자손입니다.', null, '123-45-67903', '배달의민족', null, 32, 25),
       ('OK입니다', null, '123-45-67904', 'SK', null, 76, 26),
       ('백색가전은 LG입니다', null, '123-45-67905', 'LG', null, 39, 27),
       ('KT입니다', null, '123-45-67906', 'KT', null, 29, 28),
       ('NC 소프트입니다', null, '123-45-67907', 'NC SOFT', null, 32, 29),
       ('NHN입니다', null, '123-45-67908', 'NHN', null, 1000, 30);
# insert into companies (address, avg_salary, description, homepage, latitude, longitude, rating, registration_number, company_name, logo_image, scale, user_id)
# values ('서울시 강남구 서초1동', 4000, '국민은행입니다.', null, 30.5, 20.3, 4.0, '123-46-23213', 'KB Bank', null, 40, 31);
# insert into companies (address, avg_salary, description, homepage, latitude, longitude, rating, registration_number, company_name, logo_image, scale, user_id)
# values ('서울시 강남구 방배2동', 3800, '하나은행입니다.', null, 20.8, 23.3, 4.0, '123-46-23218', 'Hana Bank', null, 30, 32);
# insert into users(email, password, name, role, contact, nickname)
# values ('company17@company.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', '네이버', 'ROLE_COMPANY', '02-832-2345', '(주)네이버'); -- 16


-- insert into companies(user_id, company_name, homepage, registration_number, description, logo_image, scale)
-- values (17, '네이버', null, '123-45-6789', '네이버입니다.', null, 6);

-- ADMIN
insert into users(email, password, name, role, contact, nickname)
values ('admin@admin.com', '$2a$10$Fl3r4xqxC51vSgTbO30r8OWtuAaT7slbPeQfwBI/0TqtGu6KMRYoq', 'admin',
        'ROLE_ADMIN', '010-1111-3323', '왕');
-- 31
--
-- 직무 태그
insert into tags (name, type)
values ('서버/백엔드', 'POSITION'),
       ('프론트엔드', 'POSITION'),
       ('웹 풀스택', 'POSITION'),
       ('안드로이드 앱', 'POSITION'),
       ('아이폰 앱', 'POSITION'),
       ('머신러닝', 'POSITION'),
       ('인공지능(AI)', 'POSITION'),
       ('데이터 엔지니어', 'POSITION'),
       ('모바일 게임', 'POSITION'),
       ('게임 클라이언트', 'POSITION'),
       ('게임 서버', 'POSITION'),
       ('시스템/네트워크', 'POSITION'),
       ('시스템 소프트웨어', 'POSITION'),
       ('인터넷 보안', 'POSITION'),
       ('QA', 'POSITION'),
       ('사물인터넷(IoT)', 'POSITION'),
       ('응용프로그램', 'POSITION'),
       ('블록체인', 'POSITION'),

-- 스킬 태그
       ('C', 'SKILL'),
       ('C++', 'SKILL'),
       ('C#', 'SKILL'),
       ('Go', 'SKILL'),
       ('Haskell', 'SKILL'),
       ('Java', 'SKILL'),
       ('Kotlin', 'SKILL'),
       ('JavaScript', 'SKILL'),
       ('TypeScript', 'SKILL'),
       ('Objective-C', 'SKILL'),
       ('Swift', 'SKILL'),
       ('JSP', 'SKILL'),
       ('PHP', 'SKILL'),
       ('ASP.net', 'SKILL'),
       ('Python', 'SKILL'),
       ('Django', 'SKILL'),
       ('R', 'SKILL'),
       ('Ruby', 'SKILL'),
       ('Rust', 'SKILL'),
       ('Visual Basic', 'SKILL'),
       ('HTML/CSS', 'SKILL'),
       ('SQL', 'SKILL'),
       ('NoSQL', 'SKILL'),
       ('JPA', 'SKILL'),
       ('Sequelize', 'SKILL'),
       ('Node.js', 'SKILL'),
       ('React.js', 'SKILL'),
       ('Vue.js', 'SKILL'),
       ('Angular.js', 'SKILL'),
       ('Svelte.js', 'SKILL'),
       ('Flutter', 'SKILL'),
       ('jQuery', 'SKILL'),
       ('React Native', 'SKILL'),
       ('Spring MVC', 'SKILL'),
       ('Spring boot', 'SKILL'),
       ('ElasticSearch', 'SKILL');

-- -- RESUME
insert into resumes(created_date, modified_date, address, birth, blog_url, contact, cover_letter, gender, github_url, name, open, resume_image, title, member_id)
values ('2020-01-02 00:00:00', '2020-01-03 00:00:00', '서울시 강북구 번동', null, null, '010-1234-5678', '하이방가방가', 'M', null, '잡식이', 'NO', 'https://www.naver.com', '잡스피드 이력서', 1);
insert into career (resume_id, company_name, in_date, out_date, position)
values (1, '잡식컴퍼니', '2020-01-02', '2021-12-15', '사장'),
       (1, '잡식컴퍼니', '2020-01-05', '2021-11-15', '부하');
insert into certificate (resume_id, cert_date, cert_name, cert_number, degree, institute, score)
values (1, '2011-08-23', '컴퓨터활용능력1급', '111-11-11111', 1, '잡식컴퍼니', 0),
       (1, '2018-05-30', '토익', '222-22-22222', 0, '토익컴퍼니', 800);
insert into scholar (resume_id, education, in_date, major, out_date, school_name)
values (1, 'HIGH', '2014-03-02', '이과', '2017-02-21', '양명고'),
       (1, 'UNIVERSITY', '2017-03-02', '컴퓨터공학과', '2020-03-21', '서울대');
insert into resume_tags (resume_id, tag_id)
values (1, 1), (1, 3), (1, 5);

insert into resumes(created_date, modified_date, address, birth, blog_url, contact, cover_letter, gender, github_url, name, open, resume_image, title, member_id)
values ('2020-01-02 00:00:00', '2020-01-03 00:00:00', '서울시 강북구 번동', null, null, '010-1234-5678', '하이방가방가', 'M', null, '잡식이', 'NO', 'https://www.naver.com', '잡스피드 이력서', 1);
insert into career (resume_id, company_name, in_date, out_date, position)
values (2, '잡식컴퍼니', '2020-01-02', '2021-12-15', '사장'),
       (2, '잡식컴퍼니', '2020-01-05', '2021-11-15', '부하');
insert into certificate (resume_id, cert_date, cert_name, cert_number, degree, institute, score)
values (2, '2011-08-23', '컴퓨터활용능력1급', '111-11-11111', 1, '잡식컴퍼니', 0),
       (2, '2018-05-30', '토익', '222-22-22222', 0, '토익컴퍼니', 990);
insert into scholar (resume_id, education, in_date, major, out_date, school_name)
values (2, 'HIGH', '2014-03-02', '이과', '2017-02-21', '양명고'),
       (2, 'UNIVERSITY', '2017-03-02', '컴퓨터공학과', '2020-03-21', '서울대');
insert into resume_tags (resume_id, tag_id)
values (2, 1), (2, 3), (2, 5);

insert into resumes(created_date, modified_date, address, birth, blog_url, contact, cover_letter, gender, github_url, name, open, resume_image, title, member_id)
values ('2020-01-02 00:00:00', '2020-01-03 00:00:00', '서울시 강남구 서초동', null, null, '010-5252-3321', '빠이염', 'F', null, '잡순이', 'NO', 'https://www.naver.com', '잡스피드 이력서', 2);
insert into career (resume_id, company_name, in_date, out_date, position)
values (3, '잡식컴퍼니', '2020-01-02', '2021-12-15', '사장'),
       (3, '잡식컴퍼니', '2020-01-05', '2021-11-15', '부하');
insert into certificate (resume_id, cert_date, cert_name, cert_number, degree, institute, score)
values (3, '2011-08-23', '컴퓨터활용능력1급', '111-11-11111', 1, '잡식컴퍼니', 0),
       (3, '2018-05-30', '토익', '222-22-22222', 0, '토익컴퍼니', 800);
insert into scholar (resume_id, education, in_date, major, out_date, school_name)
values (3, 'HIGH', '2014-03-02', '이과', '2017-02-21', '양명고'),
       (3, 'UNIVERSITY', '2017-03-02', '컴퓨터공학과', '2020-03-21', '서울대');
insert into resume_tags (resume_id, tag_id)
values (3, 1), (3, 3), (3, 5);

-- -- POST
insert into posts (post_id, created_date, modified_date, content, title, view_count, comment_count,
                   favorite_count, user_id)
values (1, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '안녕하세요.
개발자 신입이 되려고 준비하는 학생입니다.
 Java, Python, Javascript 요 세지를 공부하고 있는데요 이것들과 연동되는 데이터베이스가 뭔지 알려주세요. 가
 MongoDB나 MySQL있는것 같은데 어떤 언어가 어떤 데이터베이스와 연동이 되는지 연결해주실수있나요?
  또 MongoDB는 SQL의 문법과 많이 다른가요?', ' Python', 22, 2, 0, 1),
       (2, '2020-01-03 11:13:00', '2020-01-20 11:15:00',
        '둘의 차이가 스프링부트가 설정이 더 쉽다 이게 가장 큰 차이인가요? gradle 과 메이븐의 차이는 별로없는건가요.... 스프링 개발자가 스프링부트를 공부할때 러닝커브는 어느정도 될까요?',
        '스프링과 스프링부트의 차이', 123, 2, 0, 3),
       (3, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '계속 들어만 봐왔어서 어떤 차이점이 있는지 궁금해요.',
        'iBatis와 MyBatis의 차이점', 43, 2, 0, 3),
       (4, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '주로들 하시는 설명이 확장이 쉽고, 커스터마이징 서비스가 용이하다 라는게 일반적인 설명들이잖아요??
 재 개인적인 생각으로는 메서드명을 지키려고 사용하는거를 거창하게 포장해서 표현한다는 생각이 듭니다.
 솔직히 부모객체만으로 인터페이스를 대체할수 있다고 생각합니다.
 확장도 인터페이스 = 구현화객체; 부모객체 = 자식객체;
 이런식으로 대체 가능하고 커스터마이징 서비스는 자식객체를 새로 실수없이 만들어서 상속받고 오버라이딩하면 되는 부분이고요
 결론적으로 부모객체로는 커버할수 없는 인터페이스의 장점은 무엇이죠??
내일 면접있는데 이렇게 뿔난식으로 대답할까봐 걱정됩니다', '인터페이스의 장점에 대해 모르겠습니다. 납득좀 시켜주세요', 2, 5, 0, 5),
       (5, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '로그나 구글 검색해보면 두루뭉실하게 겉핥기처럼 간단하게 설명만 나와있고, 구체적인 예시란게 없어서 공부해보려는 제가 어떻게 시작해야할 지 막막하네요.
 도움이될만한 포스트나 예시가 있을까요? 감사합니다.', 'rest api란게 도대체 뭔가요?', 3, 1, 0, 9),
       (6, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.
 클로저란 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다.
  자신의 생성된 시점의 환경을 기억하는 함수
   렉시컬 스코프 : 함수가 중첩될 때 parser가 변수의 이름을 해석하는 방법
    Hooks도 클로져 함수이다!!!!왜 클로져를 사용할까?
    Closure는 어떤 데이터(어휘적 환경)와 그 데이터를 조작하는 함수를 연결하는 데 있어서 유용하다. (객체지향 프로그래밍의 정보 은닉과 모듈화 같은 이점을 얻을 수 있다.)
    Tip!(Closure도 남발하면 안좋을 수 있다.)
    클로져를 사용하면 가비지 컬렉션 대상이 되어야 할 객체가 메모리 상에 남아 있게 되므로, 클로져를 남발하면 메모리를 과다로 잡아 먹을 수 있기 때문이다.',
        '[Closure] 클로져란 무엇인가?', 22, 1, 0, 20),
       (7, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '현재 톰캣으로 90 포트로 돌고 있는 서비스가 있는데요~ 이번에 ssl로 변경 하게 되었습니다.
 그래서 server.xml의 <Connector port> 부분에서  redirectPort="443" 으로 해줬는데요. 기준의 윈도우 방화벽 인바운드가 90 포트로 되어있는데 이거에 443포트를 추가 해줘야 하는건가요?
  아니면 인바운드에  90 포트는 지우고 443 포트만 추가 해줘야 하는건가요?', '초보개발자 ssl 질문이 있습니다.', 432, 0, 0, 13),
       (8, '2020-01-03 11:13:00', '2020-01-20 11:15:00', '자바 정규식에 대해 알고싶어요.', '자바 정규식', 42, 0, 0,
        14);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '안녕하세요.\n 개발자 신입이 되려고 준비하는 학생입니다.\n Java, Python, Javascript 요 세가지를 공부하고 있는데요 이것들과 연동되는 데이터베이스가 뭔지 알려주세요. MongoDB나 MySQL있는것 같은데 어떤 언어가 어떤 데이터베이스와 연동이 되는지 연결해주실수있나요?\n 또 MongoDB는 SQL의 문법과 많이 다른가요?', '데이터베이스의 종류를 알고싶어요', 1, 20);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '둘의 차이가 스프링부트가 설정이 더 쉽다 이게 가장 큰 차이인가요? gradle 과 메이븐의 차이는 별로없는건가요.... 스프링 개발자가 스프링부트를 공부할때 러닝커브는 어느정도 될까요?','스프링과 스프링부트의 차이', 3, 10);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '계속 들어만 봐왔어서 어떤 차이점이 있는지 궁금해요.','iBatis와 MyBatis의 차이점', 3, 5);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '주로들 하시는 설명이 확장이 쉽고, 커스터마이징 서비스가 용이하다 라는게 일반적인 설명들이잖아요?? 재 개인적인 생각으로는 메서드명을 지키려고 사용하는거를 거창하게 포장해서 표현한다는 생각이 듭니다. 솔직히 부모객체만으로 인터페이스를 대체할수 있다고 생각합니다. 확장도 인터페이스 = 구현화객체; 부모객체 = 자식객체; 이런식으로 대체 가능하고 커스터마이징 서비스는 자식객체를 새로 실수없이 만들어서 상속받고 오버라이딩하면 되는 부분이고요 결론적으로 부모객체로는 커버할수 없는 인터페이스의 장점은 무엇이죠?? 내일 면접있는데 이렇게 뿔난식으로 대답할까봐 걱정됩니다','인터페이스의 장점에 대해 모르겠습니다. 납득좀 시켜주세요', 5, 50);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '로그나 구글 검색해보면 두루뭉실하게 겉핥기처럼 간단하게 설명만 나와있고, 구체적인 예시란게 없어서 공부해보려는 제가 어떻게 시작해야할 지 막막하네요.\n 도움이될만한 포스트나 예시가 있을까요? 감사합니다.','rest api란게 도대체 뭔가요?', 9, 10);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.\n 클로저란 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다.\n 자신의 생성된 시점의 환경을 기억하는 함수\n 렉시컬 스코프 : 함수가 중첩될 때 parser가 변수의 이름을 해석하는 방법\n Hooks도 클로져 함수이다!!!!\n 왜 클로져를 사용할까?\n Closure는 어떤 데이터(어휘적 환경)와 그 데이터를 조작하는 함수를 연결하는 데 있어서 유용하다. (객체지향 프로그래밍의 정보 은닉과 모듈화 같은 이점을 얻을 수 있다.)\n Tip!(Closure도 남발하면 안좋을 수 있다.)\n 클로져를 사용하면 가비지 컬렉션 대상이 되어야 할 객체가 메모리 상에 남아 있게 되므로, 클로져를 남발하면 메모리를 과다로 잡아 먹을 수 있기 때문이다.','[Closure] 클로져란 무엇인가?', 20, 70);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '현재 톰캣으로 90 포트로 돌고 있는 서비스가 있는데요~ 이번에 ssl로 변경 하게 되었습니다.\n 그래서 server.xml의 <Connector port> 부분에서  redirectPort="443" 으로 해줬는데요. 기준의 윈도우 방화벽 인바운드가 90 포트로 되어있는데 이거에 443포트를 추가 해줘야 하는건가요?\n 아니면 인바운드에  90 포트는 지우고 443 포트만 추가 해줘야 하는건가요?','초보개발자 ssl 질문이 있습니다.', 13, 3);
-- insert into posts (created_date, modified_date, comment_count, like_count, content, title, user_id, view_count) values ('2020-01-03 11:13:00', '2020-01-20 11:15:00', 0, 0, '자바 정규식에 대해 알고싶어요.', '자바 정규식', 14, 3);
insert into post_tags(post_id, tag_id)
values (1, 33), (2, 1), (2, 52), (2, 53), (3, 1), (3, 40), (4, 1), (4, 2), (4, 24), (5, 1), (6, 2), (6, 26), (6, 27), (7, 14), (8, 1), (8, 24);

-- -- COMMENT
insert into comments (comment_id, created_date, modified_date, content, post_id, user_id)
values (1, '2020-04-22 15:01:40', '2020-04-22 15:01:40', '언어랑 DB랑은 연동여부는 관련 없습니다. (아주 없는건 아니지만요...)
 해당 언어에서 DB와 연결할 수 있는 Driver만 제공되면 어느 언어든 연동 가능합니다.
 자바나 파이썬, Javascript (Node 겠죠?) 모두 메이저 언어이기 때문에 어지간한 DB 벤더사에서 이미 드라이버 잘 만들어놓았고, DB 커넥션을 쉽게할 수 있도록 잘 래핑한 모듈들도 많이 때문에 어렵지않게 연동 가능합니다.',
        1, 2),
       (2, '2021-04-22 15:01:40', '2021-04-22 15:01:40', 'db는 nosql입니다. 많이 다르죠', 1, 3),
       (3, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        '스프링개발자가 스프링부트를 공부할때 러닝커브 하루정도입니다.(당장 실무에 적용한다는 기준.. ) 설정이 간편해졌다 이정도입니다. 그냥 레퍼런스도큐먼트만 쭉 정독해보시면됩니다.',
        2, 1),
       (4, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        '음. 간단하게 기본 스프링 관련된거 많이 사용되는 라이브러리 같은걸 쉽게 메이븐에 넣엇다 뺏다 할수있구요 내장으로 톰캣 같은게 있어서 개발시 서버도 쉽게 띄울수있구요. 이런저런 설정 스프링 설정 이라던가 톰캣 설정을 하나의 프로퍼티파일로 관리 가능합니다.',
        2, 3),
       (5, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        '이름은 아마도 Apache proejct팀에서 google code팀으로 이동하면서 명칭이 변경되었을거에요.', 3, 5),
       (6, '2021-04-22 15:01:40', '2021-04-22 15:01:40',
        'sqlMap.xml 내부구조도 변경되었어요. sqlMap에서 Mapper로, resultClass에서 resultType, #var#에서 #{var} 등등 변화점 많아요. 한번 찾아보세요.',
        3, 8),
       (7, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '음... 글쓴분이 생각하고계신걸 좀 더 구체적으로 작성해주세요. 부모객체라는건 상속을 말씀하시는건가요?
', 4, 2),
       (8, '2021-04-22 15:01:40', '2021-04-22 15:01:40', 'SOLID https://www.nextree.co.kr/p6960/',
        4, 3),
       (9, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '님께서 말씀하신부분 하나도 틀린점이 없습니다 부모자식간의 상속으로도 충분히 해결가능하고 굳이 루즈 커플링을 지향하지 않아도 되는 소프트웨어라면 아무런 문제가 없고 세상 모두가 행복해지는 아주 빠른 지름길입니다.
 하지만 그건 소스코드를 작성하는 본인 입장에서는 그렇지만 만약 소스코드를 실행파일 형태 혹은 라이브러리 형태로 모두 빌드하고 난 후 외부에다가는 일정 함수만 공개하고 싶으실때, 그리고 그 함수의 원형을 꼭 지키게 하고 싶을때. 그럴때는 인터페이스 만큼 유용한게 없습니다^^
 사실 인터페이스란게 일정한 인풋을 지키면 예측가능한 아웃풋을 던져주는 일종의 블랙박스 같은 녀석입니다.
 또한 보통 학원이나 무언가를 배울때 인터페이스를 구현 한 후 1개 혹은 많아봤자 2~3개의 클래스만 해당 인터페이스를 사용하고 구현하죠. 사실 이러면 인터페이스를 진정으로 사용하는 것이 아니고 오히려 더 걸리적거리고 불편한것은 사실입니다^^.
 하지만 수천명이나 되는 회사에서 각자 소스코드를 작성할 때 같은 기능을 하는 함수라도 각자 네이밍하는 부분이 다르기 때문에 이 부분을 강제적으로 공통화 할 수 있는 장점도 있구요 인터페이스는 해당 인터페이스를 사용하는 클래스들이 많을 때 그 진가를 발휘하는 녀석입니다.
 아직은 작은 스케일의 코딩만 하시는 것 같은데 너무 불편하다고만 생각하실 게 아니고 지금은 아 인터페이스란게 유용한 녀석이구나. 하고 요지만 잘 파악하고 넘어가셔도 될 것 같습니다^^ 나중에는 언젠가는 쓰게되는 녀석이니까요 ㅎㅎ',
        4, 7),
       (10, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '인터페이스는 메서드명을 지킨다기보다 이 인터페이스를 구현한 애들은 이 메서드를 구현한다는 규약입니다.
 그 규약이 있기때문에 어떤 객체가 넘어오든 Runnable 인터페이스를 구현했다면 run 메서드가 존재한다고 믿는거죠. 그 구현이 어떻게 되어있느냐는 상관없고요.
 사실 객체지향의 많은 내용들은 다른분 말씀처럼 내가 지구반대편 사용자에게 모듈을 제공한다고 생각할때 그 빛을 발합니다.
 내부에서 나혼자 혹은 나랑 내옆사람이 그냥 애플리케이션 만드는 단계에서는 잘 와닿지않을 수 있어요.', 4, 4),
       (11, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '솔직히 코딩할때 인터페이스 걸리적거렸던 기억밖에 없습니다. 제약받는느낌?
 "확장성이 좋다!"
 "인터페이스는 정말 중요하다"
 말장난 같을수도 있는데... 이미 대략적으로 잘알고 계시네요.
 인터페이스는 제약을 주기 위해서 존재하는 겁니다.
 확장을 위해 제약을 거는 것이기도 하죠.
 인터페이스는 정말 중요하지만 꼭 써야하는건 아니에요. 잘 설계해서 써야 되는데. 굳이 확장성이 필요없는 설계라면 쓸필요도 없겠죠.
 면접은 그냥 책에 나온데로 외우시고, 인터페이스나 객체에 관해서는 java디자인패턴이나 코드재사용에 대한 고민이나 리팩토링을 따로 공부하시면서 익히는게 좋을듯 합니다.
느슨한 결합이라는둥 어쩐다는둥 설명은 복잡하긴 한데...
 실제 일반적인 웹개발(화면찍어내기) 할때는 인터페이스의 필요성 잘 못느낄수밖에 없고요..
 위에도 언급되었지만 라이브러리를 제공하는 입장에서는 또 전혀 다르거든요.

다른 대답은 윗분들이 훌륭하게 해주신 것 같고, 애당초 질문에 답이 나와있네요', 4, 8),
       (12, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '웹 서비스를 디자인 하는 여러 방법중 한가지에요. 특징으로는 우리가 흔히 인터넷 창에 검색하는 uri와 데이터를 주고받는 프로토콜인 http를 어떤식으로 사용했느냐로 어떤 데이터를 전송해줄지 파악하기가 쉽죠
 예를들어서, 지금 이 okky 페이지를 보면 주소창에 jobspeed.com/community/post/5 로 적혀있잖아요.
 그리고 이 페이지에 들어오기 위해서 우리가 글쓴이분이 적어주신 글을 제가 클릭해서 들어왔구요.
 여기서 웹 주소는 uri이구, 제가 클릭한 행동은 해당 uri로 HTTP GET 요청을 보낸거에요.
 그래서 RESTFUL하게 따져보자면 jobspeed.com 라는 도메인에 community/post에 있는데, 5 이 번호에 해당되는 글을 HTTP GET 가져와줘라고 요청을 한거죠.
 이것처럼 uri랑 http 메소드만 보고 무슨 일이 발생하는지 알수 있는 이유는, jobspeed를 만드신 개발자분들이 서버 디자인을 restful하게 했기 때문이에요.
 물론 굳이 restful하게 하지 않아도 되지요.
 jobspeed.com/12453/768243  이런식으로 서비스 설계를 해도 되지만, 이런 경우에는 해당 페이지가 뭘 보여주는지도 자세히 모르겠고, 아티클을 보여주는건지, 댓글을 선택하는건지도 모르겠잖아요
 또한 아래와 같이 시스템을 디자인했다고 해봅시다
 jobspeed.com/getArticles/123456
 이런 경우에는 get 요청을 보내게 되면 해당 아티클을 가져온다는건 알겠죠
 하지만 만약 포스트를 생성하고 싶다면 어떻게 해야할까요.
 jobspeed.com/createArticles/ 를 따로 만들어 줘야 하는 번잡함이 발생합니다.
 따라서 restful api를 제작할때는 최대한 명사만 활용해서 디자인을 해야해요.
 www.shopping.com/products에 get 요청을 보내면, 해당 사이트의 물품 정보를 다 가져올 수 있을테고 post 요청을 보내면, 물품 생성이 가능할테고 www.shopping.com/products/13524에 get 요청을 보내면, 13524 아이디에 해당하는 물품 정보를 가져올 수 있고 put 요청을 보내면 13524 아이디에 해당하는 물품 정보 수정이 가능하고, delete 요청을 보내면 삭제가 가능한것 처럼요.
 이런 편의성을 위해서 적용하는 시스템 디자인중 하나입니다.', 5, 15),
       (13, '2021-04-22 15:01:40', '2021-04-22 15:01:40', '감사합니다.', 6, 2);



-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2020-04-22 15:01:40', '2020-04-22 15:01:40', '언어랑 DB랑은 연동여부는 관련 없습니다. (아주 없는건 아니지만요...)\n 해당 언어에서 DB와 연결할 수 있는 Driver만 제공되면 어느 언어든 연동 가능합니다. \n 자바나 파이썬, Javascript (Node 겠죠?) 모두 메이저 언어이기 때문에 어지간한 DB 벤더사에서 이미 드라이버 잘 만들어놓았고, DB 커넥션을 쉽게할 수 있도록 잘 래핑한 모듈들도 많이 때문에 어렵지않게 연동 가능합니다.', 0, 1, 2, 1);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', 'Mongdb는 nosql입니다. 많이 다르죠', 0, 1, 3, 2);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '스프링개발자가 스프링부트를 공부할때 러닝커브 하루정도입니다.(당장 실무에 적용한다는 기준.. ) 설정이 간편해졌다 이정도입니다. 그냥 레퍼런스도큐먼트만 쭉 정독해보시면됩니다.', 0, 2, 1, 3);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '음. 간단하게 기본 스프링 관련된거 많이 사용되는 라이브러리 같은걸 쉽게 메이븐에 넣엇다 뺏다 할수있구요 내장으로 톰캣 같은게 있어서 개발시 서버도 쉽게 띄울수있구요. 이런저런 설정 스프링 설정 이라던가 톰캣 설정을 하나의 프로퍼티파일로 관리 가능합니다.', 0, 2, 3, 4);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '이름은 아마도 Apache proejct팀에서 google code팀으로 이동하면서 명칭이 변경되었을거에요.', 0, 3, 5, 5);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', 'sqlMap.xml 내부구조도 변경되었어요. sqlMap에서 Mapper로, resultClass에서 resultType, #var#에서 #{var} 등등 변화점 많아요. 한번 찾아보세요.', 0, 3, 8, 6);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '음... 글쓴분이 생각하고계신걸 좀 더 구체적으로 작성해주세요. 부모객체라는건 상속을 말씀하시는건가요? ''상속으로 인터페이스 이상의 효과를 낼수있는데 왜 인터페이스를 써야하는지 모르겠다'' 이건가요? 좀 더 정리해주시면 의견을 나누기좋을것같아요. 개인적으로 자바를 공부하면서 충분히 가질만한 생각이라고 생각하고, 제가 면접관이라면 오히려 저런 생각을 갖고있는걸 꽤나 긍정적으로 볼것같습니다. 고민을 하고있다는 의미니까요.', 0, 4, 1, 7);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', 'SOLID https://www.nextree.co.kr/p6960/', 0, 4, 2, 8);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '님께서 말씀하신부분 하나도 틀린점이 없습니다 부모자식간의 상속으로도 충분히 해결가능하고 굳이 루즈 커플링을 지향하지 않아도 되는 소프트웨어라면 아무런 문제가 없고 세상 모두가 행복해지는 아주 빠른 지름길입니다. \n 하지만 그건 소스코드를 작성하는 본인 입장에서는 그렇지만 만약 소스코드를 실행파일 형태 혹은 라이브러리 형태로 모두 빌드하고 난 후 외부에다가는 일정 함수만 공개하고 싶으실때, 그리고 그 함수의 원형을 꼭 지키게 하고 싶을때. 그럴때는 인터페이스 만큼 유용한게 없습니다^^\n 사실 인터페이스란게 일정한 인풋을 지키면 예측가능한 아웃풋을 던져주는 일종의 블랙박스 같은 녀석입니다.\n 또한 보통 학원이나 무언가를 배울때 인터페이스를 구현 한 후 1개 혹은 많아봤자 2~3개의 클래스만 해당 인터페이스를 사용하고 구현하죠. 사실 이러면 인터페이스를 진정으로 사용하는 것이 아니고 오히려 더 걸리적거리고 불편한것은 사실입니다^^.\n 하지만 수천명이나 되는 회사에서 각자 소스코드를 작성할 때 같은 기능을 하는 함수라도 각자 네이밍하는 부분이 다르기 때문에 이 부분을 강제적으로 공통화 할 수 있는 장점도 있구요 인터페이스는 해당 인터페이스를 사용하는 클래스들이 많을 때 그 진가를 발휘하는 녀석입니다.\n 아직은 작은 스케일의 코딩만 하시는 것 같은데 너무 불편하다고만 생각하실 게 아니고 지금은 아 인터페이스란게 유용한 녀석이구나. 하고 요지만 잘 파악하고 넘어가셔도 될 것 같습니다^^ 나중에는 언젠가는 쓰게되는 녀석이니까요 ㅎㅎ', 0, 4, 3, 9);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '인터페이스는 메서드명을 지킨다기보다 이 인터페이스를 구현한 애들은 이 메서드를 구현한다는 규약입니다.\n 그 규약이 있기때문에 어떤 객체가 넘어오든 Runnable 인터페이스를 구현했다면 run 메서드가 존재한다고 믿는거죠. 그 구현이 어떻게 되어있느냐는 상관없고요.\n 사실 객체지향의 많은 내용들은 다른분 말씀처럼 내가 지구반대편 사용자에게 모듈을 제공한다고 생각할때 그 빛을 발합니다.\n 내부에서 나혼자 혹은 나랑 내옆사람이 그냥 애플리케이션 만드는 단계에서는 잘 와닿지않을 수 있어요.', 0, 4, 7, 10);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '일단 Java에서는 Interface가 무조건 필요하죠. Java에서는 클래스당 상속할 수 있는 부모 클래스는 오직 하나이기 때문에 구현하고 싶은 Interface가 2개 이상이면 부모상속으로 해결 할 수가 없습니다. 장점이 아니라 필수 입니다. \n 질문자분이 궁금하신건 Java를 특정하신게 아니라 그냥 일반적인 OOP 언어에서 Java의 Interface같은 개념 자체가 필요하는지인것 같은데, 그 해답은 Java에서의 Interface 같은 개념 자체가 없는 언어를 보시면 알 수가 있습니다. 예를들면 Python 같은 건 부모 상속을 여러개 할 수 있기 때문에 굳이 따로 상속과 Interface를 구분하지 않죠. 따라서 Java는 Interface가 없으면 안되지만 일반적인 OOP에서는 굳이 상속과 Interface개념을 따로 구분할 필요가 없다는게 정답입니다.', 0, 4, 4, 11);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '"솔직히 코딩할때 인터페이스 걸리적거렸던 기억밖에 없습니다. 제약받는느낌?"\n "확장성이 좋다!"\n "인터페이스는 정말 중요하다"\n 말장난 같을수도 있는데... 이미 대략적으로 잘알고 계시네요.\n 인터페이스는 제약을 주기 위해서 존재하는 겁니다. \n 확장을 위해 제약을 거는 것이기도 하죠.\n 인터페이스는 정말 중요하지만 꼭 써야하는건 아니에요. 잘 설계해서 써야 되는데. 굳이 확장성이 필요없는 설계라면 쓸필요도 없겠죠.\n 면접은 그냥 책에 나온데로 외우시고, 인터페이스나 객체에 관해서는 java디자인패턴이나 코드재사용에 대한 고민이나 리팩토링을 따로 공부하시면서 익히는게 좋을듯 합니다.', 0, 4, 8, 12);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '느슨한 결합이라는둥 어쩐다는둥 설명은 복잡하긴 한데...\n 실제 일반적인 웹개발(화면찍어내기) 할때는 인터페이스의 필요성 잘 못느낄수밖에 없고요..\n 위에도 언급되었지만 라이브러리를 제공하는 입장에서는 또 전혀 다르거든요.\n ''특정 기능을 제공할테니 이것만큼은 꼭 지켜줘(구현해줘)''\n 위와같은 상황으로보면 규약, 표준, 약속이 되어버립니다.\n 일반 개발자들 입장에서야 사용하기만 하는 입장이라면 전혀 체감이 안돼지요. 바라보는 관점을 바꿔야 보이는거라 당장에는 이해가 안됄수 있습니다', 0, 4, 6, 13);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '다른 대답은 윗분들이 훌륭하게 해주신 것 같고, 애당초 질문에 답이 나와있네요\n ''자식객체를 새로 실수없이 만들어서 상속받고 오버라이딩하면 되는 부분''\n 실수없이 만들게 도와주는게 인터페이스라고 생각하셔도 되겠습니다.\n 그냥 상속은 실수할 수 있는 여지가 너무 많아요. 외부에 공개되어있지 않은 private 메소드 참조등으로 인하여 상속이 불가능한 케이스도 존재하구요. 메소드를 오버라이딩했을 때 발생하는 파급효과도 무시할 수 없습니다. 근본적으로 상속은 캡슐화를 위반한다는 단점이 존재합니다.\n +\n 1. 자바같은 언어에서는 다중 상속을 금지합니다. 그러므로 자바에서 mixin을 정의하려면 interface가 강제됩니다.\n 2. interface를 사용하면 mocking, proxying 등에 유리합니다. 특히 JDK dynamic proxy를 쓰려면 interface가 필수입니다.\n 3. java8 lambda도 interface만 가능합니다.', 0, 4, 15, 14);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '웹 서비스를 디자인 하는 여러 방법중 한가지에요. 특징으로는 우리가 흔히 인터넷 창에 검색하는 uri와 데이터를 주고받는 프로토콜인 http를 어떤식으로 사용했느냐로 어떤 데이터를 전송해줄지 파악하기가 쉽죠\n 예를들어서, 지금 이 okky 페이지를 보면 주소창에 jobspeed.com/community/post/5 로 적혀있잖아요.\n 그리고 이 페이지에 들어오기 위해서 우리가 글쓴이분이 적어주신 글을 제가 클릭해서 들어왔구요.\n 여기서 웹 주소는 uri이구, 제가 클릭한 행동은 해당 uri로 HTTP GET 요청을 보낸거에요.\n 그래서 RESTFUL하게 따져보자면 jobspeed.com 라는 도메인에 community/post에 있는데, 5 이 번호에 해당되는 글을 HTTP GET 가져와줘라고 요청을 한거죠.\n 이것처럼 uri랑 http 메소드만 보고 무슨 일이 발생하는지 알수 있는 이유는, jobspeed를 만드신 개발자분들이 서버 디자인을 restful하게 했기 때문이에요.\n 물론 굳이 restful하게 하지 않아도 되지요.\n jobspeed.com/12453/768243  이런식으로 서비스 설계를 해도 되지만, 이런 경우에는 해당 페이지가 뭘 보여주는지도 자세히 모르겠고, 아티클을 보여주는건지, 댓글을 선택하는건지도 모르겠잖아요\n 또한 아래와 같이 시스템을 디자인했다고 해봅시다\n jobspeed.com/getArticles/123456\n 이런 경우에는 get 요청을 보내게 되면 해당 아티클을 가져온다는건 알겠죠\n 하지만 만약 포스트를 생성하고 싶다면 어떻게 해야할까요.\n jobspeed.com/createArticles/ 를 따로 만들어 줘야 하는 번잡함이 발생합니다.\n 따라서 restful api를 제작할때는 최대한 명사만 활용해서 디자인을 해야해요.\n www.shopping.com/products에 get 요청을 보내면, 해당 사이트의 물품 정보를 다 가져올 수 있을테고 post 요청을 보내면, 물품 생성이 가능할테고 www.shopping.com/products/13524에 get 요청을 보내면, 13524 아이디에 해당하는 물품 정보를 가져올 수 있고 put 요청을 보내면 13524 아이디에 해당하는 물품 정보 수정이 가능하고, delete 요청을 보내면 삭제가 가능한것 처럼요.\n 이런 편의성을 위해서 적용하는 시스템 디자인중 하나입니다.', 0, 5, 15, 15);
-- insert into comments (created_date, modified_date, content, like_count, post_id, user_id, comment_id) values ('2021-04-22 15:01:40', '2021-04-22 15:01:40', '감사합니다.', 0, 6, 2, 16);


-- -- -- RECRUIT
insert into recruits (recruit_id, created_date, modified_date, close_date, open_date, content,
                      experience, position, status, thumbnail, title, view_count, favorite_count,
                      company_id)
values (1, '2021-04-24 19:21:19', null, '2021-04-30 23:59:59', '2021-04-25 12:00:00', '팀 소개

     매스프레소의 Production Development Division은 매스프레소의 가장 핵심 제품인 QANDA의 개발을 책임지고 있는 Division입니다. 해적선 정신과 Start-up Spirit을 가슴에 품고, 고객이 만족하는 제품을 만들어 내는 것에 집중하고 있습니다.
높은 수준의 제품 Quality 유지하는 것과 제품을 빠르게 개선하는 것을 매우 중요한 가치로 생각합니다. 이를 달성하기 위해서 실험하는 것을 좋아하며 데이터에 기반한 접근을 하기 위해 노력합니다.

Data Team은 Mathpresso의 구성원들이 목표를 달성하는 데 필요한 데이터를 적절히 활용할 수 있도록 서포트하고, 서비스/비즈니스가 올바른 방향으로 나아가고 있는지 데이터 관점에서 점검합니다.

▶ CTO Elon 인터뷰
http://bit.ly/2P1hkHW

주요 업무
   빠르게 늘어나고 있는 매스프레소의 데이터 규모에 맞추어 확장가능한 데이터 인프라를 설계하고 구축하는 업무를 담당
Data warehouse 설계
각종 로그 데이터 수집, 가공, 분석하기 위한 시스템 설계 및 구축
풀이 검색 서비스 등 핵심 서비스의 데이터 파이프라인 고도화
데이터 분석을 위한 환경(Zeppelin 등) 운영, Data Analyst 지원
자격 조건
대용량 데이터 처리 시스템 구축과 관련된 경력 1년 이상
파이프라인 및 분석 도구 개발을 위한 프로그래밍 능력(Python 우대)
우대 사항
다양한 상황에서 최적의 솔루션을 찾을 수 있는 문제해결능력 및 원활한 커뮤니케이션 역량
새로운 기술에 대한 관심이 많고 실제 서비스에 적용하여 개선한 경험
Firebase Analytics 및 BigQuery에 대한 이해 및 운영 경험
Airflow, Luigi 등의 파이프라인 라이브러리 사용 경험
클라우드 자원을 이용한 데이터 분산처리 경험
데이터 분석 및 시각화 경험
기타 사항
전형 절차: 서류 전형 → 1-2차 면접 → 최종 합격
제출 서류: 자유 양식의 국문 이력서(PDF)
근무 형태: 정규직 (수습기간 3개월)
근무 지역: 서울시 강남구 선릉로 428, 17층
회사 소개
매스프레소는 문제 검색, 질문답변, 맞춤형 개념학습 콘텐츠를 제공하는 교육 플랫폼 콴다(QANDA)를 운영하고 있습니다. 교육 콘텐츠를 디지털화해 나누고 연결해 전 세계 모두에게 동등하고 효과적인 교육을 제공한다는 비전 아래 제품 개발과 시장 확장에 집중한 지 5년 만에 누적 다운로드 2,700만 건, 글로벌 전략 국가(일본, 베트남, 태국, 인도네시아 등) 모바일 어플리케이션 교육 차트 1위 석권, Samsung Ventures, Softbank Asia Ventures, Legend Capital 등 동북아시아 최고의 투자기관에서 누적 650억 원 투자 유치의 성과를 달성했습니다. 현재는 국내외 오피스에서 180명의 팀원과 함께 글로벌 교육 시장에 새로운 패러다임을 일으키며 고속성장 중입니다.

지금 매스프레소에서는 Global No. 1 Education Platform을 향한 모험을 함께하실 팀원을 찾고 있습니다.
스마트하고 열정적인 팀원들과 함께하고 싶으신 분, 자신의 IMPACT를 피부로 느끼며 성장하고 싶은 분, 교육의 미래를 바꾸고 싶으신 분은 언제든지 환영합니다.

▶ CEO 인터뷰(EO) : https://youtu.be/55We_uNaJ20
▶ 팀 블로그: https://medium.com/mathpresso
▶ 팀 노션 : https://team.mathpresso.com/

복리 후생
코어타임 11시-5시를 기준으로 한 자유로운 출퇴근, 유연근무제 운영
눈치 없는 휴가 사용과 무제한 휴가 제도
점심&저녁 식사비 지원
월 10만 원의 자기개발비 지원 (도서, 세미나, 교육)
월 10만 원의 체력단련비 지원 (피트니스, 요가, 필라테스 등)
근속 기간 3년, 5년 시 리프레시 휴가와 휴가비 지급
주거와 생활 안정을 위한 대출 지원
배우자와 함께 건강검진 지원
팀 커뮤니케이션 활성화를 위한 티타임 및 식사 비용 별도 지원
무료 스낵바, 에스프레소 머신, 음료 등의 무제한 간식 지원
맥북, 모니터 등의 고사양 IT장비 지원
사내 동아리 활동 지원 (밴드, 탁구, 독서모임 운영 중)
매년 떠나는 해외 워크샵
 ', 0, 'PERMANENT', 'REGULAR', null, 'Data Engineer 구인', 470, 0, 16),

       (2, '2021-04-07 19:21:19', null, '2021-04-30 23:59:59', '2021-04-13 12:00:00', '업무 소개
Service Design 팀의 Data Engineer 로서 Fulfillment Center (FC)의 운영 향상을 위한 인사이트를 제공하는 데이터를 발견, 추출, 생성하며 예측 모델을 개발하는 역할을 맡게 됩니다. Service Design 팀은 효율적이고 확장성 있는 FC 운영을 지원하며 쿠팡의 성장에 기여하는 팀입니다. 창의적인 문제해결 능력을 갖춘 인재들이 모여 혁신적인 비즈니스 솔루션을 제공합니다. 데이터를 기반으로 비즈니스 의사결정이 이루어질 수 있도록 지원하며, FC의 운영 목표 달성을 위한 각종 인사이트, 지표 및 도구 등을 제공합니다.

물류, Fulfilment Center (FC), 공급체인 등과 관련한 대규모의 (비)정형 데이터를 분석하여 비용 및 생산성 개선 지원
데이터 애널리스트, 데이터 사이언티스트를 비롯한 각종 유관 부서와 협업하여 개선 기회 모색 및 운영 생산성 최적화
정량적 분석을 수행하여 FC 운영 간 발생하는 이슈의 근본 원인을 발견하고 데이터를 기반으로 한 솔루션을 제공
새로운 FC 운영 아이디어 및 전략 도입을 위한 테스트를 설계, 시행 및 분석하여 구체적인 개선안 제공
비즈니스 핵심 지표의 설계 및 개발, 비즈니스 인사이트 제공을 위한 자동화된 대시보드 생성, 대시보드 트랙킹 및 유의미한 인사이트의 추출을 위한 데이터 시각화 작업
설득력 있는 스토리를 바탕으로 논리적인 솔루션 제시, 데이터를 기반으로 한 액션 시행
정기적인 분석을 자동화하여 의사결정의 효율성 제고
자격 조건
컴퓨터 공학, 수학, 공학 또는 이에 준하는 관련 분야 학사 학위
BigData Platform, Data Warehouse, Data Migration 관련 툴과 프레임워크 등 데이터 플랫폼 구성요소의 설계, 개발, 운영 관련 경험 (3-5년)
데이터 정량 분석 경험 (3-5년)
중급 이상 SQL 활용 능력 (데이터 추출, 쿼리 작성 등)
Python, R 등 프로그래밍 언어 사용 경험
다양한 이해관계자와 효율적으로 커뮤니케이션을 진행할 수 있는 분
데이터 분석 및 이해에 대한 열정, 창의적 사고 및 문제해결 능력은 필수
우대 사항
통계학, OR (Operation Research), 컴퓨터 공학, 정보학, 공학, 응용수학, 경제학 등 수학 관련 분야 석사 혹은 박사 학위 소지자
대규모 데이터 처리 경험
Tableau, Power BI 등 데이터 시각화 툴의 사용 경험
중급 이상 MS Excel 활용 능력
경영진을 포함한 다양한 이해관계자를 대상으로 복잡한 문제를 단순화하여 설명 및 전달할 수 있는 뛰어난 커뮤니케이션 능력
채용절차 및 안내사항


전형절차
서류전형 - 전화면접 -대면면접 – 최종 합격
전형절차는 직무별로 다르게 운영될 수 있으며, 일정 및 상황에 따라 변동될 수 있습니다.
전형일정 및 결과는 지원서에 등록하신 이메일로 개별 안내드립니다.
참고사항
본 공고는 모집 완료 시조기 마감될 수 있습니다.
지원서 내용 중 허위사실이 있는 경우에는 합격이 취소될 수 있습니다.
보훈대상자 및 장애인 여부는 채용 과정에서 어떠한 불이익도 미치지 않습니다.', 3, 'PERMANENT', 'PROCESS', null,
        'Senior, Data Engineer (Fresh Process)', 232, 0, 16),

       (3, '2021-04-02 19:21:19', '2021-04-15 16:08:38', '2021-04-30 23:59:59',
        '2021-04-16 12:00:00', '업무 소개
사이트 웹 개발 (Front & Back End)
해외 파트너사/금융기관과의 해외 송금 및 결제 플랫폼 개발
시스템 운영 및 유지보수
자격 조건
PHP Framework (Cl, 라라벨, 심포니) 경험자 혹은 빠르게 적응 가능하신 분
js framework 경험자(node.js, backbone, angular, react, marionette 등)
MySQL 등의 데이터베이스 SQL에 경험이 있으신 분
우대 사항
내공이 탄탄한 컴퓨터 관련 전공자 (자료구조/알고리즘/프로그래밍언어/데이터베이스 등의 수업 수강한 개발자)
리눅스 플랫폼에서도 익숙하게 개발할 줄 아는 개발자
아파치 서버를 능숙하게 다룰 줄 아는 개발자
What to do보다는 How to do를 고민하는 개발자
Git / Slack / Mantis 등의 개발 보조 도구에 익숙한 개발자
글로벌 핀테크기업 아데나소프트웨어의 100% 자회사로 총 40억원의 자본금을 바탕으로 설립되었으며, 2019년 말 첫번째 핀테크 서비스인 ''유트랜스퍼'' (소액해외송금업 기재부 인가 2019-1호)를 런칭하여 운영하고 있습니다.

회사의 역량은 직원에게서 나온다는 것을 잘 알고 있기에 성과에 대한 보상은 항상 최고 수준을 유지하고 있으며, 회사가 역삼역 8번 출구에서 150M 거리(강남구 테헤란로 207 아가방빌딩)에 있어 출퇴근이 편하다는 점은 부가적인 장점입니다.

조식, 점심 식대 및 무한 간식 제공 (연 400만원 상당)
해외 휴양지 워크샵(7일) 반기 1회 진행 (2019/06 코타키나발루, 2019/12 발리 등)
매달 Yes24 적립금으로 5만원을 드립니다. 책도 보고 영화/뮤지컬도 보세요. 몇 달 모으면 게임기도 살 수 있습니다.
자기계발(체력단련비 월 10만원) 비용 지원
근속 3년마다 휴가 2주 제공
최고급 장비 및 소프트웨어, 150만원 상당의 의자 등 최고의 업무환경 제공
안마의자, 카페테리아, 수면실 운영
4대보험
전직원 건강검진
개발 팀 & 환경
팀내 개발자	3명
버전관리	Gitlab
기술 스택	ReactJS, AngularJS, Backbone.js, Node.js, MySQL, C++, PHP
프로젝트 관리	Trello
OS 환경	Linux', 3, 'PERMANENT', 'PROCESS', null, '웹 개발자', 11, 0, 18),

       (4, '2021-02-28 19:21:19', null, '2021-02-10 23:59:59', '2021-02-02 12:00:00', '업무 소개
[이런 일을 하시게 됩니다]
저희 테스트웍스가 수집하고 가공한 데이터를 이용하여 보다 더 좋은 고품질데이타로 가공하여 인공지능 모델을 테스트하고 만들 수 있습니다.
가공할 수 있도록 시스템을 구성하여 빠른 시간안에 고품질의 데이터를 생성 합니다.
다양한 가공방법들을 통해서 양질의 데이터를 생산해 내는 일을합니다.
인공 지능 분야의 다양하고 빠른 변화에 대응하기 위한 기반요소가 되는 고품질의 데이터데 구축하고 제공하는 일을 합니다.

[이런 경험이 필요합니다]
웹시스템을 기반으로 한 데이터 수집,가공을 처리하기위해python/PHP/JavaScript/Json/Sql(mysql,postgresql)/ 언어 사용 경험
다양한 시스템을 구축 응대할 수 있는 Cloud환경(Azure / AWS / GCP) 경험
여러 시스템간의 연관처리를 위한 Network지식
/ Linux / Nginx, Apache / docker, kubernetes / git , svn

[테스트웍스 PF 개발팀은 이런 일을 합니다]
데이터 수집와 가공자를 위한 프레임워크구축 (영상, 음성, 텍스트)
커스터마이징 개발
시스템간의 연계작업처리를 위한 API개발/운영관리
국내.외 사용자를 위한 시스템구축 및 운영
어떻게하면 다른사람이 일을 쉽게할수있을지 고민하는 시간을 갖습니다.
어떻게 하면 나는 더 쉽게 일을 할수있을지 고민을 더 많이 갖습니다.
때로는 몰입개발을 하기도합니다.
매번은아니지만 어딘가에 숨어서 개발하는 것을 추진합니다.(소통만되면)

[주요 업무]
AI 데이터 수집
AI Framework 기반의 Model을 구성하여 다양한 사용자로부터 데이터를 수집
다양한 형태의 수집 모듈 개발 (이미지, 텍스트, 음성, 영상)
AI 데이터 가공
AI Framework을 통해 수집된 데이터를 클라우드소싱 / 인하우스 형태로 가공툴 개발
영상/문서/음성/텍스트등의 미디어를 AI 학습가능한 데이터로 전처리하는 기능개발
플랫폼개발
커뮤니티스러운 대내외적으로 사용하는 프레임워크를 개발
회사에서 문제해결의 중심점인 툴개발 / 운영

자격 조건
AI 데이터셋 수집 및 가공 위한 프레임워크 개발
Javascript,CSS, HTML는 잘가지고 노시는분
React,Redux 기반의 Web service 개발 및 유지보수 경험
REST API에 대한 이해
크로스 브라우징 및 반응형 웹에 대한 이해
백엔드 툴에 대한 기본적인 이해 (Django/Laravel)
DB를 기본적이 구조는 이해
Docker를 이해 (Kubernetes 는 더 잘 이해)

우대 사항
프론트엔드 개발 경험 3년 이상
백엔드(Laravel, Django/Nodejs), 인프라 및 웹서비스 전반에 대한 이해
Typescript 경험자
GnuBoard와 같은 CMS 사용경험 / 이해
새로운 것에 대한 도전의식
다양한 업무환경응대
대용량 데이타베이스 시스템 운영경험
         앱(안드로이드 / iOS)구축 경험

개념프로그래머 – 난 개념으로 일해 – 라는 분
주위에서 ‘넌 진짜 멘탈 강해’ 라는 소리 듣는 분
한번 제대로 백엔드 업무를 해보고 싶은 분
놀면서 일하고 싶으신분
원활한 소통을 좋아하시는분
뭐든 일단 해보자는 마음을 가진 자 환영
배움에의지가 있는 자
어떤 상황에서도 무한 긍정 마인드를 가질 수 있는 자
개선점이 있으면 고치고 싶어하는분', 5, 'PERMANENT', 'EARLY', null, '프론트엔드 웹 개발자', 342, 0, 19),

       (5, '2021-03-30 19:21:19', null, '2021-04-13 23:59:59', '2021-04-03 19:21:14', '업무 소개
오픈서베이 서비스 개발/운영
데이터 수집/분석 플랫폼 개발
자격 조건
서비스 개발/운영 3년이상 혹은 이에 준하는 역량
Spring framework / MySQL 개발 경험
우대 사항
AWS 활용한 개발/운영 경험이 있으신 분
데이터 수집/분석 서비스 개발 경험이 있으신 분
웹 서비스 성능 최적화 경험이 있으신 분
【 오픈서베이 소개 】
고객 경험의 시대, 오픈서베이는 기술로 설문조사의 가치를 다시 씁니다. 전 세계의 질문에 대한 답을 함께 찾을 개발자를 기다리고 있습니다.

오픈서베이는 기술을 통해 지루했던 설문조사 시장에 생기를 불어넣었습니다. 데이터 수집부터 분석까지의 전 과정을 자동화했고 알고리즘과 인공지능을 통해 누구나 소비자 데이터를 쉽게 분석할 수 있도록 합니다. 오픈서베이가 수집한 데이터로 만드는 트렌드 리포트는 6만 명이 넘는 이들이 구독하며 소비자 데이터에 대한 관심과 데이터 기반의 의사결정의 저변을 넓혀왔습니다.

현재 1,800여 개의 기업이 오픈서베이와 함께 소비자와 사용자, 임직원과 고객으로부터 의견을 수집하여 더 나은 제품과 서비스, 기업 문화를 만들어가고 있습니다.

【 오픈서베이 개발팀 소개 】
오픈서베이 팀이 지역 확장과 분석 플랫폼 강화를 통한 초고속 성장 기회를 포착한 만큼, 이를 함께 만들어 갈 동료 개발자와 즐겁게 일할 준비도 잘 되어 있습니다.

개발팀은 코딩 실력만큼이나 오픈서베이 서비스 자체의 성공에도 반드시 기여하는 성숙도 높은 팀원들이 함께하고 있습니다.

지금 오픈서베이 팀에 합류하는 것은 매출과 이익을 잘 내며 성장하고 있는 오픈서베이를 좋은 동료와 함께 발전시켜나갈 기회이자, 유관 경력으로 글로벌 시장에서 인정받을 좋은 기회이기도 하다는 점을 강조하고 싶습니다.

【 오픈서베이 구성원 인터뷰 】
• 오픈서베이 QA팀장 인터뷰, 기술 회사에도 사람의 세심한 손길이 필요한 이유
https://bit.ly/2WAT6Fd
• 오픈서베이의 ‘예쁜 육각형’ 모두와 즐겁게 일할 때 가장 좋은 개발자 인터뷰
https://bit.ly/37WcXnI
• 주니어 고속 성장의 비결, 오픈서베이는 이렇게 조언합니다.
http://bit.ly/2VxSxtI
• 오픈서베이 ‘인간 AI?’ 개발자가 사내 문서를 빠짐없이 읽는 이유
https://bit.ly/3mGtHW6
• 오픈서베이 황희영 대표, 설문조사에 AI적용, 동영상과 이미지로 세밀한 분석 가능
https://bit.ly/3kCrgn7
• 오픈서베이 이건노 CTO, 공동성장 가능해야 좋은 개발팀입니다
http://bit.ly/2PPZdkK

오픈서베이가 구성원과 함께 하는 키워드는 ‘배움’과 ‘성장’입니다. 함께 배우고 일하며 성장하는 과정에서 다른 구성원에게 긍정적인 자극을 주면서 함께 성장할 수 있는 오픈서베이를 만들어 가실 분은 꼭 지원해주세요. :)

【 채용 절차 】

서류심사 > (코딩테스트) > 1차면접(실무진) > 2차면접(경영진) > 채용
1차 면접은 기술 면접으로 간단한 문제풀이도 같이 진행 할 수 있습니다.
서류 제출 시 본인의 Github (https://github.com/) URL 제출 (선택사항)
Github에는 직접 개발한 코드를 올려주세요. (일부분만 올리셔도 됩니다)

【 복지 및 혜택 】
[Refresh]
180만원의 복지포인트 - 운동, 여행, 자기계발에 쓸 수 있는 현금성 복지포인트 180만원
재충전을 위한 리프레쉬 - 휴가 근속 3년마다 리프레시 휴가 및 휴가비 지급
월 1회 조기 퇴근 - 아무도 이유를 물어보지 않는 매월 1회 2시간 조기 퇴근
자유로운 연차 사용 - 누구의 눈치도 볼 필요 없는 자유로운 연차 사용

[Life]
재택 근무제 - 집중하고 싶을때, 집에 일이 있을때, 반려동물이 아플때
강남역 30초컷 사무실 - 춥고 비오는 날이면 특별히 더 좋은 위치
간식과 음료 무한 제공 - 당이 땡길때와 아침을 안먹었을때
초과 근무시 식사와 택시 제공 - 불가피한 주말 출근이나 야근 시 식사와 출퇴근 택시비 제공

[Growth]
고사양 장비 제공 - 최고 사양의 노트북(윈도우, 맥 중 선택)과 소프트웨어 지원
도서 지원 - 생각보다 광범위한 업무 관련 도서 100% 지원
컨퍼런스 및 교육 지원 - 업무 관련 컨퍼런스 및 외부 교육 지원
다양한 사내 교육 - 엑셀부터 sql까지 일을 잘하기 위한 다양한 사내 교육 제공', 7, 'PERMANENT', 'END', null, '백엔드 개발자',
        32, 0, 20),

       (6, '2021-03-12 19:21:19', '2021-03-14 16:08:42', '2021-03-30 23:59:59',
        '2021-03-24 19:21:14', '업무 소개
Java Springframework을 이용한 MSA 기반의 음악 서비스 feature API 개발
음악 서비스 Backend Platform 개발
자격 조건
총 개발 경력 1년 이상인 분
Java spring framework에 능숙하신 분
Java Web Service Back-end 개발 및 운영 경험이 있는 분
DBMS/SQL/ORM 에 대한 이해가 있는 분
우대 사항
Linux 시스템에 대한 이해
디자인 패턴에 대한 이해
서버 개발 및 운영(DevOps)
MSA 개발 환경에 대한 이해
MongoDB 경험
Redis/MQ/Apache Zookeeper 경험
Backend 개발자는 서버개발팀/MCP개발팀/이용권정산개발팀 중 1팀으로 배치됩니다.
입사하시면 아래와 같은 것들을 경험하실 수 있어요.

   [서버개발팀]
    - 대용량 플랫폼, 다양한 Backend SW 를 기반으로 내가 해보고 싶은 것들을 마음껏 구현해 볼 수 있는 환경입니다
- 끈끈한 팀웍으로 멘토링제를 운영하고 주기적인 스터디와 코드리뷰를 진행하고 있습니다
- 내 손으로 서비스 feature를 만들어 직접 사용자에게 제공하기에 개발자로서 보람을 느낄 수 있습니다
- on-premise 고용량 서버부터 cloud 환경까지 다양한 환경을 경험할 수 있습니다
- java spring msa, grpc 를 비롯해 다양한 개발/실행환경을 경험하면서 기술스택을 넓힐 수 있습니다

   [이용권/정산 개발팀]
   이용권/정산 개발팀은 상품의 생성부터 판매 후, 저작권자들에게 정산까지 콘텐츠 플랫폼의 이용과 관련된 전반적인 업무를 총괄합니다.     조금 더 자세히는 사업에서 요구하는 다양한 구독 상품들을 구현하고,
    여러 결제 수단을 제공하여 고객이 쉽고 빠르게 상품을 구매 할 수 있도록 합니다.     또한, 고객이 사용한 콘텐츠 이력들을 기반으로 SM, 빅히트, YG 같은 유통사들에게 저작권료를 계산하여 줍니다.     저희 팀에 입사하시면 콘텐츠 플랫폼 상품 구성과 네이버페이, 카카오페이, 휴대폰 결제 등의 결제 수단 연동의 A to Z를 경험 할 수 있습니다.
    그리고 Python 기반의 빅데이터 프레임워크를 통해 수백만명이 사용하는 서비스의 대규모 데이터 처리도 경험 할 수 있습니다.         MSA, JPA 같은 기술을 적용하기 위해선 대규모의 작업이 필요하지만, 팀원들이 서로 상의하여 적용 여부를 결정 할 수 있는 환경이 갖춰져 있습니다.     항상 커리어를 고민하고 새로운 기술에 관심 있어 하는 팀원들로 구성되어 있습니다. 배움에 목마르신 분들이라면 환영합니다.

   [MCP개발팀]
    - FLO MCP개발팀은 탄력적인 R&R 조정에 의한 업무 협업으로 전체 업무와 기술 스택 경험이 가능합니다.
    - 뮤직 도메인에 특화된 메타 데이터 체계과 자동화된 입수 시스템, 다양한 서비스를 경험 할수 있습니다.
- 표준화된 전문 처리를 위한 XML/EXCEL Parser
- Audio / Video Transcoding     - Streaming Service
- 뮤직 도메인 메타 데이터 처리 / 관리 / 연계
- Admin / Backoffice 콘텐츠 관리 시스템
- 자동화된 Content Unification Pipeline
- Restful API 시스템     - 대용량 데이터 Batch 처리
- MSA + 비동기 메세징 시스템 조합
- 다양한 언어와 기술 스택을 사용 합니다.
Java / Kotlin / Go / Python
RDB / MongoDB / Hive / Elastic Search / Redis / Zookeeper
IDC / Cloud 환경
VM / Docker / 물리장비 서버군



드림어스는 이렇게 일해요.

    -  2주간 80시간, 스스로 업무시간을 정해요. (선택적 근로시간제)
    -  주 1회, 원하는 장소에서 일해요. (Remote Work)
         ※ 현재는 코로나 상황으로 전사 재택근무 중 입니다.
    -  서로를 영어 닉네임으로 부르면서 좀 더 편하게 얘기해요.
    -  입사년도부터 매년, 기본 제공 연차+최대 5일의 휴가를 더 쓸 수 있어요.

   드림어스는 이런 혜택이 있어요.

    ▶ Family & Life
     -  매년 100만원 Dream포인트(공연/음반/문화/여행/도서/체력단련) 지급
     -  결혼 휴가 10일 제공 및 각종 경조사 휴가, 축하/위로금 지급
     -  연 1회 20만원 상당 본인 및 배우자의 종합건강검진 지원
     -  사내 주택자금 대출 지원
     -  휴양 콘도 할인 혜택 제공

▶ 업무 지원
     -  매월 SKT 통신비 4만원 지원
     -  사내 온라인 강의 및 직무 연계 오프라인 강의/세미나 참석 지원
     -  연장근로 식대/교통비 지원
     -  장기근속 휴가 및 축하금 지원', 2, 'PERMANENT', 'END', null, '뮤직서비스 FLO Backend 개발', 56, 0, 21),

       (7, '2021-01-25 16:07:52', null, '2021-01-30 23:59:59', '2021-01-26 19:21:14', '업무 소개
빅데이터와 A.I. 기술을 적용한 디지털마케팅 플랫폼 개발업무와 솔루션,
SaaS형 서비스사업을 하고있으며, 빅데이터와 최신기술을 경험 할 수 있습니다.
- 솔루션 백엔드 개발
- Java framework 기반 시스템 개발
- 카카오 알림톡, 친구톡 API 개발
- 대량 이메일/앱푸시 플랫폼 개발
자격 조건
- 개발 경력 1년이상
- Spring framework 이해 및 활용이 가능하신 분
우대 사항
- JAVA Back-end 개발 경험이 있으신 분
- RDBMS의 이해와 활용 경험을 가지고 계신 분
- API, 웹서버 개발과 유지보수 경험이 있으신 분
- E-commerce  도메인 경력을 가지고 계신 분

이런 분들과 함께 하고 싶습니다
- 프로그래밍이 즐겁다고 생각하시는 분
- 능동적인 기능제안 및 개선 의지가 강하신 분
- 효과적인 문제해결 능력 및 분석적인 사고능력을 가지고 계신 분
- 성장을 위해 끊임없이 연구하고  새로운 것을 배우기에 주저함이 없으신분
<업무에만 집중 할 수 있도록 근무환경을 만들고자 노력합니다>
 - 선릉역 3번출구 도보 5초 거리에 위치
 - CAFE HUMUS 운영_커피, 음료 제공
 - 아침(김밥, 빵), 간식(컵라면, 음료수 등) 제공
<개인의 성장을 지원하고 회사의 성장을 생각합니다>
 - 온라인/오프라인 교육 지원
 - 세미나 참석지원
 - 도서 구입비 지원
<업무 효율을 위해서 쉬는 것도 중요합니다>
 - 자유로운 연차사용
 - Refresh 휴가 및 지원금 지급 (5년,10년)
 - 징검다리연휴 전사 휴무
 - 결혼기념일 조기퇴근
 - 콘도이용 지원
<더 다양한 복지를 위해 고민하고 있습니다>
 - 사내 대출 제도 운영
 - 명절 상여금/선물 지급
 - 생일선물(상품권) 지급
 - 경조사 지원(경조휴가 및 경조비 등)
', 8, 'PERMANENT', 'REGULAR', null, '솔루션 / 서비스 개발자', 33, 0, 22),

       (8, '2021-02-02 16:07:55', '2021-02-09 16:08:55', '2021-03-01 23:59:59',
        '2021-02-03 19:21:14', '자격 조건
컴퓨터 공학, 수학, 공학 또는 이에 준하는 관련 분야 학사 학위
Python 또는 Golang 중 1개 이상 언어 사용 가능하신 분
대용량 분산 시스템에 대한 전반적 이해가 있으며, 이를 이용해 실제 서비스까지 개발한 경험이 있으신 분
클라우드 환경에서의 개발/운영 경험이 있거나 그에 준하는 지식을 보유하신 분
우대 사항
Docker 또는 Kubernetes 기반 서비스 경험
AWS, GCP 등 클라우드 기반 데이터 플랫폼 구축 및 운영 경험
새로운 기술에 대한 관심이 높고, 실제 서비스까지 적용해본 경험이 있으신 분
인공지능 학습 데이터 에 대한 이해
데이터 서비스 개발을 위한 소프트웨어 개발 역량을 갖추신 분
주요 개발 스택 및 문화
필요한 만큼 이해하기 쉽게 만든다
사용자에게 필요한 기능만 만든다. (애자일 방법론)
기획자가 이해할 수 있게 요구사항을 정리한다. (BBD, Domain Driven Design)
개발자가 읽기 쉬운 코드를 만든다. (Clean Architecture, Clean Code)
빠르고 버그 없이 만든다
인터페이스 먼저 설계한다. (API Driven Development, Test Driven Development)
지속적으로 통합한다. (Continuous Integration, Code Review)
끊임없이 성장한다
문제 해결을 중심으로 더 나은 해결 방식과 새로운 기술에 대해 탐구한다
관련 기술에 관한 세미나 혹은 컨퍼러스에 적극적으로 참여한다.
자발적으로 스터디를 조직하여 관련 지식과 정보를 공유한다.
복리후생
좋은 환경에서 일하자!
AM 8시 ~ AM 10:30 선택적 자율 출근 (점심시간 포함 9시간 근무)
야근시 저녁식사 제공 및 교통비 지원!
짝수 주에는 금요일 오후 2시 퇴근!!
개발자라면 자기계발 지원(도서 , 강의, 세미나 , 컨퍼런스 등)는 기본!
수평적인 분위기 조성을 위한 영어 이름 사용
맛있는거 먹고, 멋있게 일하자!
술 안마시는 건강한 회식! 월 1회 자주 먹기 힘든 음식을 먹을 수 있는 기회!
점심 식대 제공
허기진 배 간식으로 보충!
기타
의사결정 권한이 직책자에게 집중되어 있지 않습니다.
직급의 상하를 가리지 않고 다양한 의견을 말할 수 있습니다.
구성원 간에 지식을 개방적으로 공유하고 있습니다.
일이 없어도 억지로 야근을 하거나, 눈치 보면서 퇴근을 하지 않습니다.
불필요한 직급을 없애고, 계층이 나누어져 있지 않으며 닉네임을 사용합니다.', 2, 'PERMANENT', 'EARLY', null, '데이터 엔지니어', 23, 0,
        23),

       (9, '2021-02-02 16:08:03', null, '2021-02-15 23:59:59', '2021-02-03 19:21:14', '업무 소개
"내 코드 한줄이 국민 절반의 신용등급을 높인다면?"
                               ▼
          3분 만에 대한민국을 바꿔볼까요?
ㅤ
ㅤ
금융업 최초로 100% AWS 코어 환경의 배포 파이프라인을 갖추는 경험을 할 수 있습니다
DevOps Guru 등 AWS 최신 기술들을 탐구하여 생산성과 안전성을 고도화합니다.
월 대출 신청액이 1조가 넘는 대규모 환경이 유연하게 돌아가도록 시스템을 개발합니다.
자격 조건
2년 이상의 DevOps 경험을 보유하신 분
Public Cloud(AWS) 환경 서비스 운영 경험이 있으신 분
Docker 기반으로 서비스를 구성/운영한 경험이 있는 분
Python, Java, Golang 중 하나 이상의 언어에 능숙한 분
Linux 환경에서 서비스 개발/운영 경험이 있는 분
우대 사항
가장 뛰어난 금융 배포환경 구축에 관심이 있으신 분
다양한 문제에 대해 논리적인 사고를 통한 해결 능력을 보유하신 분
VPN, 방화벽, L4/L7스위치 등에 대한 네트워크 운영 경험이 있으신 분
금융관련 IT 업무 경력을 보유하신 분
지원하기
 ', 4, 'PERMANENT', 'REGULAR', null, 'DevOps 엔지니어', 22, 0, 24),

       (10, '2021-03-27 16:08:07', null, '2021-04-08 23:59:59', '2021-03-28 19:21:14', '업무 소개
리디의 모바일 앱개발자는 고객이 원할 때 언제 어디서나 책을 읽을 수 있도록 최상의 독서 경험을 만들어냅니다.
리디북스 모바일 앱 개발(내 서재, 뷰어, 동기화 등), 리디페이퍼 펌웨어/앱 개발, EPUB 뷰어 엔진 개발 등의 업무를 수행하게 됩니다.
직무소개
리디 모바일 앱 클라이언트 개발
최고의 독서경험 제공을 위한 뷰어 개발
크로스 플랫폼 기반 모바일 네이티브 모듈 개발
자격 조건
모바일 앱 개발 경력 4년 이상
React Native 개발 경험
Swift 혹은 Kotlin을 이용한 개발 경험
새로운 기술을 익히고 적용하는 데에 거부감이 없으신 분
우대 사항
Javascript(ES6+), TypeScript 언어 사용 경험
EPUB/PDF/웹툰 관련 개발 경험
테스트 자동화 경험
평소 전자책 독서를 즐기시는 분
[전형 절차]

서류 전형 > 온라인 코딩테스트 > 면접 전형', 4, 'PERMANENT', 'PROCESS', null, '모바일 앱 엔지니어', 19, 0, 25),

       (11, '2021-02-06 16:08:12', null, '2021-02-20 23:59:59', '2021-02-10 19:21:14', '안녕하세요, 국내 최고의 생활서비스 매칭플랫폼 숨고입니다.
누구나 손쉽게 전문가를 찾고, 누구나 나에게 맞는 고객을 찾기는 어렵습니다.
고객은 발품 팔지 않고 전문가인 숨은고수를 찾을 수 있고,
전문가는 쉽고 빠르게 고객을 찾고 비즈니스 구축을 시작할 수 있는 곳.
바로 우리가 만들어 나가는 ''숨고''에서는 가능합니다.
☞ 숨고 생태계가 추구하는 가치 소개

우리는 기록보다는 사람 간 연결이 주는 가치에 주목합니다.
누적 240여 억 원 투자, 누적 견적서 2500만 여 건, 1000여개 이상의 서비스 카테고리,
460만 명 이상의 고객, 60만 명 이상의 고수...지금까지 숨고가 만들어 온 성과입니다.
하지만, 숨고는 기록보다 고객과 고수에게 최고의 사용자 경험을 선사하는 데에 집중합니다.
사람과 사람, 고수와 고객이 만들어 가는 진정성 있는 연결의 힘을 믿기 때문입니다.

지금. 숨고와 함께 할 용감한 동료를 찾습니다.
고객이 고수가 되어, 고수가 고객이 되어
누구나 숨고를 통해 삶을 주도적으로 변화시킬 수 있도록.
지금, 숨고와 비전에 공감하고 함께 서비스를 만들어 나갈 ''용감한'' 동료를 찾습니다.
-----
우리는 일할 때 아래의 5가지의 핵심 가치를 추구합니다.
• Professional : ‘숨고인은 모든 일에 프로의 자세로 임합니다’
오너십 갖기, 서로 존중하기, 약속 지키기
• Transparent : ‘숨고인은 열린 마음으로 소통합니다’
항상 정직하기, 열린 마음으로 소통하기
• Data-driven : ‘숨고인은 데이터 기반으로 효율적인 의사결정을 합니다’
데이터 기반으로 의사결정 내리기, 우선순위 세우기, 성공방식 찾기
• Impactful : ‘숨고인은 임팩트 있는 일에 집중합니다’
효과적으로 일하기, 폭넓게 영향을 끼치는 확장가능한 업무에 집중하기
• Brave : ‘숨고인은 용기있는 혁신을 추구합니다’
계산된 리스크를 안고 지속적으로 혁신하고 개선하기
☞ 숨고인이라면 누구나 지켜야 할 ''5가지 핵심 가치''

우리는 숨고 핵심가치에 부합하는 분들과 함께 하고 싶습니다.
1. 업무를 주도적으로 수행하고, 피드백을 겸허히 받아들일 줄 아는 분
2. 모든 것을 투명하게 공유하고 소통하는 것에 두려움이 없으신 분
3. 데이터를 기반으로 스마트하게 생각하고 합리적인 의사결정을 추구하는 분
4. 큰 그림을 그리며 고객과 고수, 숨고 생태계를 바라볼 수 있는 분
5. 현실에 안주하지 않고 결단력 있게 용기있는 도전을 꿈꾸는 분

숨고의 5개 팀에서 최고의 동료가 여러분을 기다리고 있습니다.
1. 숨고의 ''마에스트로'' Product 팀
2. 숨고의 ''엔진'' Tech 팀
3. 숨고의 ''모티베이터'' Admin 팀
4. 숨고의 ''첫인상'' CX 팀
5. 숨고의 ''어벤져스'' Marketing 팀
언론에서 주목한 숨고의 이야기도 함께 확인해보세요.
1. DBR Case Study : 라이프스타일 서비스 중개 플랫폼 ''숨고''의 성장 전략 (2020.05)
2. 숨고 “2년 만에 누적 견적 1천만건 넘었다” (2019.12)
3. 전문서비스 매칭플랫폼 ‘숨고’, 구글플레이 ‘올해를 빛낸 자기계발 앱’ 선정 (2019.12)
4. 숨고, 시리즈B 125억 투자 유치 (2019.6)
[숨고 Tech팀 철학]
1. 진짜 애자일(Agile)한 협업을 추구합니다.
팀원간의 신뢰를 통한 건강한 개발 프로세스를 지향합니다. 개발, 제품, 디자인까지 팀웍을 기반으로 유연하게 구성되어 있습니다. 기획 단계부터 부터 개발, 배포 완료까지 기획, 디자이너, 개발자 모두 참여합니다. 또한 매 스프린트마다 만들 것을 서로 플래닝하면서 정말 중요한 일이 무엇인지 파악하고, 그외의 것은 과감히 내려 놓습니다. 또한 의사소통이 어렵거나 추후 유지보수를 위해서 모든 프로세스는 JIRA, Confluence 등의 업무툴을 이용한 실용적인 문서화를 지향하고 있습니다.
2. 우리가 가장 잘할 수 있는 일을 합니다.
우리는 오로지 숨고를 위한 서비스에 집중하며, 우리 고객의 만족을 위해 개발을 합니다. 우리가 가장 잘 할 수 있는 기술 개발 외에는 현재 AWS(서버인프라), ElasticSearch(검색), LogDNA(로그), NewRelic(모니터링), Amplitude(유저행동분석), Segment(통계취합), Braze(고객CRM)등 여러 기술솔루션을 적극 도입하고 집중력을 유지합니다.
3. 숨고 개발의 지속적인 성장을 추구합니다.
서로의 코드를 리뷰 해가면서 고민을 공유하고, 구현한 코드를 분석하면서 서로 간의 기술을 배울 수 있습니다. 또한 서로 다른 기술 분야의 이해와 플랫폼 전체의 발전을 위해서 내부 기술세미나를 진행합니다. 이를 통해, 현재까지 만들어진 숨고 전체 기술 스택은 다음과 같습니다. (https://stackshare.io/soomgo/soomgo)
[숨고 모바일 앱 Engineer (iOS/React Native/React)]
 숨고의 모바일 앱 엔지니어 (React Native / React)는 숨고의 안드로이드 / iOS 앱 모두를 담당하는 핵심 포지션 입니다.
• ReactNative 를 활용하여 숨고 iOS/Android 어플리케이션 개발
자격 조건
• 1년 이상의 React Native / React.js 실무 개발경험이 있는 분
• 성능 최적화에 대해 지속적으로 고민하고 노력하시는 분
• Restful API에 대한 이해와 실무 경험이 있는 분
• 코드 리뷰 하기를 좋아하며 협업을 잘 하실 수 있는 분
우대 사항
• 모바일 네이티브 언어(Swift, Objective C, JAVA) 개발 경험이 있는 분
• 상용 모바일 앱 개발 및 출시 경험이 있는 분
• 속도 향상을 위한 최적화에 대한 고민과 지속적으로 서비스에 적용해본 경험이 있는 분
• WebSocket을 통한 데이터 통신 및 UI 적용 경험이 있는 분
• TDD 경험이 있는 분
숨고의 팀원은 최고의 환경과 복지 아래에서 일합니다.
1. 자율과 책임을 존중하는, 최적의 근무시간
• 오전 9-11시 사이 자율적으로 출근, 주 40시간 동안 근무합니다.
• 눈치보지 말고 쓰세요. 연차에는 이유를 묻지 않습니다.
• 월 1회 리모트로 근무할 수 있습니다.
• 매년 명절(설날, 추석) 전날 그리고 마지막 근무일에는 모두 조기퇴근합니다.
2. 업무에 효과적으로 몰두할 수 있도록, 최고의 근무환경
• 팀원 전원에게 루나랩 원터치 스탠딩 책상을 지급합니다.
• PC, 노트북 등 최적의 업무 장비를 지원합니다. (포지션 별 상이)
• 지하철 2호선 선릉역과 삼성역 사이, 편리한 교통의 공유오피스에서 일합니다.
3. 개인의 성장과 팀의 성장 두 마리 토끼를, 아낌없는 성장지원
• 업무에 도움이 되는 교육비, 도서비는 아낌없이 지원합니다.
• 직접 써봐야 안다, 숨고 서비스 이용 체험비를 매년 추가 지원합니다.
• 활발한 사내 스터디와 세미나를 권장하고 적극 지원합니다.
• 구성원 모두에게 연간 120만원 상당 복지카드를 지급합니다.
4. 일하기 행복한 회사가 좋은 회사, 휴가&경조사 혜택
• 명절에는 구성원 모두에게 상품권을 지급합니다.
• 생일날 케익, 상품권을 지급하고, 조기퇴근 혜택을 드립니다.
• 기쁨도 슬픔도 함께, 탄탄한 경조휴가와 경조금을 지원합니다.
• 열심히 일한 자 떠나라, 장기근속자는 10일의 refresh 휴가를 지급합니다.
5. 지속적으로 업그레이드되는 기타 지원
• 매월 팀원과의 점심 맛집탐방, 팀별 회식을 지원합니다.
• 팀원들의 친목 도모와 체력 증진을 위해 매월 사내 동아리 활동비를 지원합니다.
• 원하는 간식은 무한으로 제공합니다.
• 청년내일채움공제, 청년소득세감면에 대해 적극 지원합니다.
• 야근 택시비, 야근 식대 제공은 기본입니다.
• 연 1회 건강검진을 지원합니다.
• 신규 입사자에게는 숨고의 welcome kit를 제공합니다.
[숨고멤버 Join]
• 서류 : 이력서(자기소개서) 및 경력 기술서
• 코드 테스트 : (서류전형 합격시) 코드테스트 전달 예정.
• 인터뷰 : 코드테스트 피드백 및 숨고 Fit, R&R 논의
• Finally, 숨고 멤버로 입사!', 3, 'PERMANENT', 'REGULAR', null,
        '[숨고] Mobile App Engineer (iOS/React Native/React)', 32, 0, 26),

       (12, '2021-03-14 16:08:19', null, '2021-04-24 23:59:59', '2021-03-24 19:21:14', '업무 소개
기능 테스트, QA 진행
버그 수집, 관리
업데이트 오픈 테스트
게임 분석 결과 공유
자격 조건
경력 불문 상기 [담당업무]에 대해 자신있는 분
스스로 테스트 시트를 작성하고 결과보고가 가능하신 분
베팅 게임에 대한 지식과 경험이 있으신 분
채용 시 경력 증명서 제출 필수
우대 사항
포트폴리오 제출 가능하신 분
각종 이슈관리 툴(노션, 멘티스 등) 사용에 익숙하신 분
ㆍ사내 카페테리아 음료수 쇼케이스/고급에스프레소머신 비치
ㆍ개인 업무용 데스크탑/주변기기 지급
ㆍ구내식당 식권 지급
ㆍ청년내일채움공제 가입 적극지원
ㆍ중소기업청년소득세 감면 가입 적극지원
ㆍ주차 지원
ㆍ명절상여', 0, 'PERMANENT', 'REGULAR', null, '[투윈게임즈] QA 담당자', 11, 0, 27),

       (13, '2021-03-04 16:08:25', '2021-03-14 16:09:08', '2021-03-30 23:59:59',
        '2021-03-05 19:21:14', '업무 소개
서버 인프라는 AWS를 사용 하고 있으며 ECS, ApiGateway를 주로 사용하고 있습니다. 현재 10개 이상의 마이크로 서비스들이 존재합니다. 메시지 브로커는 SQS를 사용하고 있으며 Kafka로 변경하려 합니다. 효율적인 관리를 위해 Terraform으로 ECS와 ApiGateway를 마이그레이션 하고 있습니다. 인프라 모니터링을 위해 Datadog을 사용 중이며 Datadog 또한 Terraform으로 관리하고 있습니다.
　
Github Actions를 사용하여 CI/CD 파이프라인을 구축하여 이용 중에 있습니다. 추후 Kubernetes(EKS), Helm, ArgoCD를 이용하여 파이프라인을 업데이트 하려고 합니다. production, qa 환경에서 운영중이며 개발단에서도 좀더 쉽게 이용 할 수 있도록 제공하려고 합니다. Spot Fleet을 이용하여 비용 효율화를 진행하려 합니다. 무중단 서비스를 만들기 위해 노력합니다.
　
저희와 함께 모두싸인의 성장을 도와주실 분들을 끊임없이 찾고 있습니다. 많은 관심과 지원 부탁 드립니다!
AWS 클라우드 환경에서 고가용성 인프라 구축 및 운영
APM, Tracing, Logging, Infra 모니터링 및 자동화
개발팀 문화, 프로세스 개선 & CI/CD 파이프라인 구축 및 유지보수
Legacy 시스템을 호환 가능한 Kubernetes로 마이그레이션
문제에 대한 핵심 파악과 구조화 된 해결방법을 이끌어 낼 수 있는 분

주요 기술 스택
- MySQL (AWS Aurora)
- Docker, Docker-compose
- AWS (ECS, SNS, SQS, API Gateway 등)
- Terraform
자격 조건
한 가지 이상의 언어를 능숙하게 다루실 수 있는 분
OS, 네트워크를 중심으로 하는 CS 전반에 걸친 기본적인 이해
Terraform 사용에 대한 이해
AWS 클라우드 서비스에 대한 기본적인 이해
문제에 대한 핵심 파악과 구조화 된 해결방법을 이끌어 낼 수 있는 분
다른 직무의 팀원과 적극적으로 대화할 수 있는 의사소통 태도와 능력
장애 발생시 빠른 확인이 가능 한 트러블 슈팅 스킬
새로운 것을 빠르게 배우고 호기심이 많으신 분
해외여행 결격사유가 없는 분
병역필 또는 면제자
우대 사항
AWS 클라우드 환경 실무 경험
SQL/No-SQL 관리 경험
분산 서비스 로깅, 모니터링 파이프라인 구축 경험이 있으신 분
대용량 트래픽을 처리하는 시스템 운영 경험이 있으신 분
Terraform, Ansible 등 IaaC를 통한 인프라 자동화 및 운영 경험이 있으신 분
마이크로서비스 운영 시 Kubernetes, ServiceMesh 등을 적용한 경험이 있으신 분
마이크로서비스 아키텍처에 관심이 있거나 운영 경험이 있는 분


※ 프로덕트팀에 대해 더 자세히 알고 싶다면 아래 글을 읽어주세요
▶ 엔지니어 노션페이지: http://bit.ly/3rgMYiB
▶ 기술블로그: https://bit.ly/3sfOlzq
회사소개
모두싸인은 ''계약이 모두에게 더 간편하고 안전할 수 있도록 바꾼다.'' 라는 사명 아래 전자계약 시장을 혁신하고 있는 스타트업입니다. 프라이머, 한국투자파트너스 등 주요 기관들으로부터 투자를 받았으며, 국내 1위의 전자계약 서비스로서 디지털 전환을 선도하고 있습니다.(네이버 트랜드 기준)
　
현재 모두싸인은 미국의 DocuSign(시가총액 약 50조원), 일본의 CloudSign(시가총액 약 3조원)처럼 빠른 성장세를 보이고 있으며, 궁극적으로 국내 최고의 B2B SaaS 기업이 되기 위해 노력하고 있습니다.
　
저희와 함께 모두싸인의 성장을 도와주실 분들을 끊임없이 찾고 있습니다. 많은 관심과 지원 부탁 드립니다!
#모두싸인팀에 대해 더 자세히 알고 싶다면 아래 글을 확인해 주세요!
▶ 모두싸인 블로그: http://bit.ly/3twpsQO
　
　
혜택 및 복지
1) 유연한 업무환경
- 원격근무 : 주1회 자택이나 카페에서 근무가능
- 유연근무 : 9~10시 사이 자유롭게 출근, 8시간 근무 후 퇴근
　
2) 최상의 업무환경
- 업계 상위 수준의 대우
- 맥북프로, 삼성올웨이즈 등 최신장비 지원
- 듀얼 또는 4K 모니터 지원
- 시디즈 의자 기본 제공, 안마의자
- 다양한 간식 제공 및 식대 지원
　
3) 자기계발 지원
- 도서, 강의, 세미나 및 컨퍼런스 참가비 지원
- 사내 스터디 지원
　
4) 친목 및 교류
- 왜곡된 회식문화, 음주문화 없음
- 놀기 위한 워크샵 연 1회 진행 (해외/국내)
- 주기적인 타운홀 미팅 진행
- 모수데(모두수다데이), 친바점(더 친해지길 바래 점심), 메이트 활동 등 지원
　
5) 기타복지
- 3년 이상 장기근속자 포상
- 건강 관리를 위한 복지 포인트 지급 (분기별)
- 매년 건강검진 지원
- 생일선물 및 명절선물 지원 등
　
　
전형절차
1. 서류전형
- 어떤 경험을 가지고 계신지 알기 위한 절차에요.
- 자유 형식으로 이력서를 제출하게 됩니다.
2. 온라인 테스트와 과제
- 온라인 문제를 이용해서 어떤 지식을 가지고 있는지 확인하는 절차에요.
- 과제는 최대 2일 내에 구현할 수 있는 요구사항을 드리고 구현하게 됩니다.
- 가급적 JAVA / Typescript / Javascript / Python 중 원하시는 Framework로 응시를 부탁드립니다.
3. 직무 및 구성원 면접
- 기술적인 역량을 살펴보기 위한 과정이에요. 미래의 팀원이 면접을 보게 돼요.
- 다른 직군의 팀원과 이야기해보는 시간을 가지게 돼요.
- 지원자와 팀원 서로가 어떤 문화 속에서 성장해왔는지 알아가는 시간을 가져요.
※ 원격지에 거주하시는 지원자의 경우 직무면접에 한하여 화상면접 진행
4. 임원면접
- 모두싸인에 대한 관심도, 성장에 대한 욕구, 가치관 등을 확인하는 과정이에요.
5. 처우협의
- 처우, 출근날짜, 근무지 등을 최종적으로 협의하는 과정이에요.', -1, 'PERMANENT', 'REGULAR', null, 'DevOps 엔지니어', 24, 0, 28),

       (14, '2021-04-25 16:08:33', null, '2021-05-15 23:59:59', '2021-04-25 19:21:14', '업무 소개
이마고웍스는 인공지능 기반 디지털 덴티스트리 전문 기업입니다. 한국과학기술연구원의 정식 스핀 오프 회사로서, 다년간 축적한 의료영상 분야 3차원 형상 모델 처리, 인공지능, 클라우드 기반 의료 소프트웨어 기술을 바탕으로,
디지털 덴티스트리 및 의료 인공지능 분야를 혁신하고자 합니다.
세계적 수준의 3차원 형상 모델 처리 및 인공지능 기술을 확보한 이마고웍스와 함께 성장하실 새 멤버를 모십니다!
회사 소개 인터뷰
http://www.biotimes.co.kr/news/articleView.html?idxno=3507
회사 멤버들 집필 저서
http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788942915255
홈페이지: https://imagoworks.ai
주요업무
• CAD 알고리즘 연구/개발
• VTK 등 3D 그래픽 라이브러리 기반 응용 소프트웨어 개발
• 3D polygon mesh processing
자격 조건
• 컴퓨터공학, 기계공학 또는 CAD, 컴퓨터 그래픽스 관련학과 학위 소지자
• C++ 프로그래밍 가능자
• 프로그래밍 library 사용에 능숙한 자
우대 사항
• Web 기반 프로그래밍 실무 경험자
• 상품화 실무 경험자
• 3D 형상 모델 자료구조 개발 경험자
자율 출퇴근제
점심 식사 제공
교육 지원 (도서, 온라인 강의, 학회 등)
경력에 따라 스톡옵션 제공 가능', -1, 'PERMANENT', 'REGULAR', null, '의료용/치과용 3D CAD 소프트웨어 개발', 399, 0, 29);

insert into recruit_tags(recruit_id, tag_id)
values (1, 8), (2, 8), (3, 1), (3, 2), (3, 3), (4, 2), (5, 1), (6, 1), (7, 12), (7, 13), (8, 8), (10, 4), (10, 5), (11, 4), (11, 5), (11, 51), (12, 15), (13, 12), (13, 13), (14, 13);
