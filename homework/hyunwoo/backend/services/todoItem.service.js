import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 할일 목록 조회
export function findTodoItems(userId) {
  return todoItemRepository.findMany(userId);
}

// 할일 목록 추가
export function postTodoItemById(title, userId) {
  const newId = todoItemRepository.getIncrementedId();

  const newTodoItem = {
    id: newId,
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  console.log(newTodoItem);
  todoItemRepository.save(newTodoItem);
  return newTodoItem;
}

// 할일 한가지 조회
export function findTodoItemById(id) {
  return todoItemRepository.getTodoItemById(id);
}

// 할일 수정하기
export function putTodoItemById(id) {
  const existTodoItem = todoItemRepository.getTodoItemById(id);  
  const doneAt = existTodoItem.doneAt == null ? new Date() : null
  todoItemRepository.update(existTodoItem, doneAt);
}

// 할일 삭제하기
export function deleteTodoItemById(id) {
  const existTodoItem = todoItemRepository.getTodoItemById(id); 
todoItemRepository.deleteOne(existTodoItem);
}
