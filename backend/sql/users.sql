create table users (
    id int auto_increment primary key,
    email varchar(64) not null unique comment "사용자 이메일",
    password varchar(256) not null comment "비밀번호",
    name varchar(64) not null comment "사용자 이름",
    role varchar(16) not null comment "사용자 역할",
    created_at datetime not null default current_timestamp comment "가입 시간"
);