import prisma from "../common/prisma.js";

// id에 맞는 todoItem 찾기
export async function getTodoItemById(userId) {
  return await prisma.todoItem.findUnique({
    where: {
      userId,
    },
  });
}

// todoItems 찾기
export async function findMany(userId) {
  return await prisma.todoItem.findMany({
    where: {
      userId,
    },
  });
}

// todoItem 추가하기
export async function saveTodoItem(todoItem) {
  const createdTodoItem = await prisma.todoItem.create({
    data: {
      title: todoItem.title,
      userId: todoItem.userId,
    },
  });
  return createdTodoItem.id;
}

// todoItem index 찾아서 수정하기
export async function updateTodoItem(id, doneAt) {
  await prisma.todoItem.update({
    where: {
      id,
    },
    data: {
      doneAt,
    },
  });
}

// todoItem index 찾아서 삭제하기
export async function deleteOne(id) {
  await prisma.todoItem.delete({
    where: {
      id,
    },
  });
}
