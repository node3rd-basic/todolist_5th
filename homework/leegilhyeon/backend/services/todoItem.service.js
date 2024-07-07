import * as todoItemRepository from "../repository/todoItem.repository.js";
import CustomError from "../common/custom.error.js";


export async function findTodoItemById(id) {
  const todoItem = await todoItemRepository.findTodoItemById(id);
  if (!todoItem) {
    throw new CustomError("해당 아이디가 가진 todoItem이 없습니다.", 404);
  }
  return todoItem;
}

export async function todoItemByUserId(userId) {
  return await todoItemRepository.findTodoItems(userId);
}

export async function getTodoItem(title, userId) {
  //const newId = todoItemRepository.getNewId();
  const newTodoItem = {
    //id: newId,
    userId: userId,
    title: title,
    // doneAt: null,
    // createdAt: new Date(),
    // updatedAt: null,
  };
  await todoItemRepository.pushTodoItem(newTodoItem);
  return newTodoItem;
}

export function putTodoItemById(id) {
  const todoItemFind = findTodoItemById(id);
  const doneAt = todoItemFind.doneAt == null ? new Date() : null;
  todoItemRepository.putTodoItem(todoItemFind, doneAt);
}

export function deleteTodoItemById(id) {
  const deleteTodoItem = findTodoItemById(id);
  todoItemRepository.deleteById(deleteTodoItem);
}
