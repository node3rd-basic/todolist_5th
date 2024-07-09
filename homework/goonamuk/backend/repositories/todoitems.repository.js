import { title } from "process";
import conn from "../common/conn.js";

// user의 id 값으로 todo-items 를 조회
export const getPostByUserId = async (id) => {
  const [userPosts] = await conn.execute(
    `SELECT * FROM todo_items WHERE user_id = ${id}`
  );

  return userPosts;
};

// post의 id 값으로 todo-items 를 조회
export const getPostById = async (postId) => {
  const userPostById = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );
  return userPostById;
};

//입력한 keyword 값으로 todo-items 조회
export const getPostbyKeyword = async (id, keyword) => {
  const userPostsByKeyword = await conn.execute(
    `SELECT * FROM todo_items WHERE title LIKE %${keyword}% AND user_id = ${id}`
  );

  return userPostsByKeyword;
};

//입력한 post params로 todo-items 삭제
export const deleteMyPostByPostId = async (id, postId) => {
  const findPostByPostId = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );

  // if (!findPostByPostId) {
  //   throw new Error("해당하는 할 일이 없습니다.");
  // }
  // if (findPostByPostId.user_id !== id) {
  //   throw new Error("권한이 없습니다.");
  // }

  const deleteMyPostByPostId = await conn.execute(
    `DELETE FROM todo_items WHERE id = ${postId}`
  );

  return;
};

export const toggleTodoItemByPostId = async (id, postId) => {
  // todo-items 에서 id 값으로 todo-item 찾기
  const findPostByPostId = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );

  // if (findPostByPostId.user_id !== id) {
  //   throw new Error("권한이 없습니다.");
  // }

  // todoItem 의 doneAt 을 toggle 처리
  const toggledTodoItem = await conn.execute(
    `UPDATE todo_items SET done_At = IF (done_At is NOT NULL, NULL, NOW()) WHERE id = ${postId}`
  );

  return toggledTodoItem;
};

// todo-items 의 가장 마지막에 새 아이템을 넣기

export const createNewTodoItem = async (id, title) => {
  // todo-items 에 새로운 todo-item 추가
  const newTodoItem = await conn.execute(
    `INSERT INTO todo_items (user_id, title) values (${id}, ${title})`
  );

  return newTodoItem;
};
