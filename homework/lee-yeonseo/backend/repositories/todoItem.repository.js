import prisma from '../common/prisma.js';

//할일 찾기
export const findTodoItemById = async (todoItemId) => {
  const foundItem = await prisma.todoItem.findUnique({ where: { id: todoItemId } });

  return foundItem;
};

//할일 목록 조회
export const findTodoItemByUserId = async (userId) => {
  const myTodoItems = await prisma.todoItem.findMany({ where: { userId } });
  return myTodoItems;
};

//할일 등록
export const postTodoItem = async (userId, title) => {
  const newTodoItem = await prisma.todoItem.create({
    data: {
      userId,
      title,
    },
  });

  return newTodoItem;
};

//할일 완료 여부 토글
export const todoItemDoneAt = async (todoItemId, doneAt) => {
  await prisma.todoItem.update({ where: { id: todoItemId }, data: { doneAt } });
};

//할일 삭제
export const deleteTodoItem = async (todoItemId) => {
  await prisma.todoItem.delete({ where: { id: todoItemId } });
};
