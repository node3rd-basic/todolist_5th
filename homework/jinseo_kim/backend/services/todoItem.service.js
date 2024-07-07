import * as todoItemRepository from '../repositories/todoItem.repository.js';
import CustomError from '../common/custom.error.js';

export function getTodoItemsByUserId(userId) {
  return todoItemRepository.findMany(userId);
}

export function getTodoItemById(id) {
  const todoItem = todoItemRepository.findOneById(id);
  if (!todoItem) {
    throw new CustomError(404, 'Oops! 당신의 할 일이 존재하지 않습니다.');
  }
  
  return todoItem;
}

export function createTodoItem(title, userId) {
  const newTodoId = todoItemRepository.getNewId();
  const newTodoItem = {
    id: newTodoId,
    userId: Number(userId),
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoItemRepository.pushItem(newTodoItem);
  return newTodoItem;
}

export function deleteTodoItemById(id) {
  const selectedTodoItem = getTodoItemById(id);
  todoItemRepository.deleteOne(selectedTodoItem);
}
export function toggleDonAtById(id) {
  const selectedTodoItem = getTodoItemById(id);
  const doneAt = selectedTodoItem.doneAt ? null : new Date();
  todoItemRepository.update(selectedTodoItem, doneAt);
}
