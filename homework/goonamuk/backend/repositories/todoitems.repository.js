import { title } from "process";
import todoitemsDB from "../databases/todoitems.db.js";
import conn from "../common/conn.js";

// user의 id 값으로 todo-items 를 조회
export const getPostByUserId = (id) => {
  const userPosts = todoitemsDB.filter((item) => item.userId === id);
  return userPosts;
};

// post의 id 값으로 todo-items 를 조회
export const getPostById = (postId) => {
  const userPostById = todoitemsDB.find((item) => item.id === postId);
  return userPostById;
};

//입력한 keyword 값으로 todo-items 조회
export const getPostbyKeyword = (id, keyword) => {
  const userPostsByKeyword = todoitemsDB.filter(
    (item) => item.title.includes(keyword) && item.userId === id
  );

  return userPostsByKeyword;
};

//입력한 post params로 todo-items 삭제
export const deleteMyPostByPostId = (id, postId) => {
  const index = todoitemsDB.findIndex((item) => item.id === postId);
  const findPostByIndex = todoitemsDB[index];

  if (index < 0) {
    throw new Error("해당하는 할 일이 없습니다.");
  }
  if (findPostByIndex.userId !== id) {
    throw new Error("권한이 없습니다.");
  }

  console.log(index, findPostByIndex);
  todoitemsDB.splice(index, 1);

  return findPostByIndex;
};

// todo-items 에서 id 값으로 todo-item 찾기
export const toggleTodoItemByPostId = (id, postId) => {
  const findPostById = todoitemsDB.find((item) => item.id === postId);

  console.log(findPostById);

  // todoItem 의 doneAt 을 toggle 처리
  const toggledTodoItem = {
    ...findPostById,
    doneAt: findPostById.doneAt ? null : new Date(),
  };

  // 선택된 toggleItem 의 index 값 찾기
  const index = todoitemsDB.findIndex((item) => item.id === postId);

  if (findPostById.userId !== id) {
    throw new Error("권한이 없습니다.");
  }
  console.log(index);
  todoitemsDB.splice(index, 1, toggledTodoItem);

  return toggledTodoItem;
};

// todo-items 의 가장 마지막에 새 아이템을 넣기

export const createNewTodoItem = (id, title) => {
  // todo-items 에서 id 값 생성
  const postId =
    todoitemsDB.length > 0 ? todoitemsDB[todoitemsDB.length - 1].id + 1 : 1;

  // todo-items 에 새로운 todo-item 추가
  const newTodoItem = {
    id: postId,
    userId: id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoitemsDB.push(newTodoItem);

  return newTodoItem;
};
