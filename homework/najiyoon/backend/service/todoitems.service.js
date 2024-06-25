// import todoItems from "../db/todoitems.js";
import todoitems from "../db/todoitems.js";
import * as todoItemsRepository from "../repository/todoitems.repository.js";
//userId를 가져왔으니 user.id에서 userId로
//인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
//목록조회
export function getTodoItemsByUserId(userId) {
  return todoItemsRepository.findMany(userId);
}
//할일등록
export function postTodoItem(userId, title) {
  const newId = todoItemsRepository.getNewId();

  const newTodoItem = {
    id: newId,
    userId: userId,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: "2021-08-01",
  };
  todoItemsRepository.saveTodoItem(newTodoItem);
  return newTodoItem;
}
//할일 1개 조회
export function oneTodoItem(id) {
  const todoItem = todoItemsRepository.oneTodoItem(id);
  if (!todoItem) {
    throw new Error("투두아이템이 없습니다.");
  }
  return todoItem;
}

export function findTodoItemById(id) {
  return todoItemsRepository.findById(id);
}

export function toggleTodoItemDone(id) {
  const todoItem = findTodoItemById(id);
  if (!todoItem) {
    throw new Error("해당 투두아이템을 찾을 수 없습니다.");
  }

  const updatedTodoItem = {
    ...todoItem,
    doneAt: todoItem.doneAt === null ? new Date() : null,
  };

  return todoItemsRepository.update(id, updatedTodoItem);
}
//삭제
export function findDelById(id) {
  //삭제할 투두아이템을 투두아이템에 있는지 확인
  const delTodoItem = todoItemsRepository.spliceIndex(
    (todoItems) => todoItems.id === id
  );
  if (delTodoItem === -1) {
    res.status(400).json({ message: "해당하는 할일이 없습니다." });
  }

  //할일이 있다면 : 자르기
  // todoItemsRepository.spliceIndex(delTodoItem, 1);
  return;
}
