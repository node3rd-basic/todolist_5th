import * as todoitemRepository from "../repositories/todoitem.repository.js";
import { CustomError } from "../common/custom.error.js";

export const putTodoitem = async (id, userId) => {
  return await todoitemRepository.changeTodoItem(id, userId);
};

export const deleteTodoitem = async (id, userId) => {
  const data = await todoitemRepository.deleteTodoitem(id, userId);
  if (!data) throw new CustomError("데이터가 존재하지 않습니다.", 404);
  return data;
};
