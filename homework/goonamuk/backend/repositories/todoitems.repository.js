import { title } from "process";
import conn from "../common/conn.js";

// user의 id 값으로 todo-items 를 조회
export const getTodoItemsByUserId = async (id) => {
  const [userItems] = await conn.execute(
    `SELECT * FROM todo_items WHERE user_id = ${id}`
  );

  const findedTodoItems = userItems.map((userItems) => {
    return {
      id: userItems.id,
      userId: userItems.user_id,
      title: userItems.title,
      doneAt: userItems.done_At,
      createdAt: userItems.created_at,
      updatedAt: userItems.updated_at,
    };
  });

  return findedTodoItems;
};

// post의 id 값으로 todo-items 를 조회
export const getPostById = async (postId) => {
  const userPostById = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );
  return userPostById;
};

//입력한 keyword 값으로 todo-items 조회
export const getItemsbyKeyword = async (id, keyword) => {
  const useritemsByKeyword = await conn.execute(
    `SELECT * FROM todo_items WHERE title LIKE %${keyword}% AND user_id = ${id}`
  );

  return useritemsByKeyword;
};

//입력한 post params로 todo-items 삭제
export const deleteMyItemByItemId = async (id, postId) => {
  const findTodoItemByItemId = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );

  if (!findTodoItemByItemId) {
    throw new Error("해당하는 할 일이 없습니다.");
  }
  if (findTodoItemByItemId.user_id !== id) {
    throw new Error("권한이 없습니다.");
  }

  const deleteMyItemByItemId = await conn.execute(
    `DELETE FROM todo_items WHERE id = ${postId}`
  );

  return;
};

export const toggleTodoItemByItemId = async (id, postId) => {
  // todo-items 에서 id 값으로 todo-item 찾기
  const findtodoItemByitemId = await conn.execute(
    `SELECT * FROM todo_items WHERE id = ${postId}`
  );

  if (findtodoItemByitemId.user_id !== id) {
    throw new Error("권한이 없습니다.");
  }

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
    `INSERT INTO todo_items (user_id, title) values (${id}, '${title}')`
  );

  const [getMyTodoItem] = await conn.execute(
    `SELECT * FROM todo_items WHERE user_id = ${id} ORDER BY id DESC LIMIT 1`
  );

  const [returnTodoItem] = getMyTodoItem.map((getMyTodoItem) => {
    return {
      id: getMyTodoItem.id,
      userId: getMyTodoItem.user_id,
      title: getMyTodoItem.title,
      doneAt: getMyTodoItem.done_At,
      createdAt: getMyTodoItem.created_at,
      updatedAt: getMyTodoItem.updated_at,
    };
  });

  return returnTodoItem;
};
