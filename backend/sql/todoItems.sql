create table todo_items (
   id int auto_increment primary key,
   user_id int not null comment "작성자",
   title varchar(512) not null comment "할일 제목",
   done_at datetime default null comment "처리 완료 시간, null 일경우 미완료",
   created_at datetime not null default current_timestamp comment "작성 시간",
   updated_at datetime on update current_timestamp comment "수정 시간"
);