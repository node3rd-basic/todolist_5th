import * as todoitemRepository from "../repositories/todoitem.repository.js";

export const putTodoitem = (id, userId) => {
  const findTodoItem = todoitemRepository.findTodoItem(id);

  const data = todoitemRepository.changeTodoItem(id, userId, findTodoItem);
  return data;
};

export const deleteTodoitem = (id) => {
  const findTodoItem = todoitemRepository.findIndexTodoItem(id);

  if (todoitemRepository.deleteTodoitem(findTodoItem)) return true;
};
