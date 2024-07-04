import * as todoItemRepository from '../repositories/todoItem.repository.js';

export function getTodoItemsByUserId(userId) {
  return todoItemRepository.findMany(userId);
}

export function getTodoItemById(id) {
  const todoItem = todoItemRepository.findOneById(id);
  if (!todoItem) {
    throw new Error('Todo item not found');
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
