export default [
  {
    id: 1,
    userId: 1,
    title: "할일목록",
    doneAt: null,
    createdAt: "2023-11-11",
    updatedAt: "2023-11-11",
  },
];

//

// create table najiyoon.users (
// 	id int auto_increment primary key comment '유저 아이디',
// 	email varchar(32) not null comment '유저 이메일',
// 	password varchar(128) not null comment '유저 비밀번호',
// 	name varchar(24) not null comment '유저 이름',
// 	role varchar(128) not null comment '유저 역할 (student, tutor)'
// )

// create table najiyoon.todo_items (
// 	id int auto_increment primary key comment '투두 아이디',
// 	user_id int not null comment '작성한 유저 아이디',
// 	title varchar(512) not null comment '투두 내용',
// 	done_at datetime comment '투두 완료 시간',
// 	created_at datetime not null default current_timestamp comment '투두 생성 일시',
// 	updated_at datetime on UPDATE current_timestamp comment '투두 수정 일시'
