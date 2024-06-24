import todoData from "../db/todoitem.db";

export const getTodolist = (id) => {
  const data = todoData.find((el) => el.id === +id);
  if (!data) throw new Error("존재하는 데이터가 없습니다.");
  return data;
};
