// import todoItems from "../db/todoitems.js";
import * as todoItemsRepository from "../repository/todoitems.repository.js";
//userId를 가져왔으니 user.id에서 userId로
//인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
export function getTodoItemsByUserId(userId) {
  return todoItems.filter((todoItems) => todoItems.userId === userId);
}

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
  todoItemsRepository.postTodoItem(newTodoItem);
  return newTodoItem;
}
