import * as todoitemRepository from "../repositories/todoitem.repository.js";

export const putTodoitem = async (id, userId) => {
  const findTodoItem = await todoitemRepository.getTodolists(id);

  const data = await todoitemRepository.changeTodoItem(
    id,
    userId,
    findTodoItem
  );
  console.log(data);
  return data;
};

export const deleteTodoitem = async (id, userId) => {
  const data = await todoitemRepository.deleteTodoitem(id, userId);

  return data;
};
