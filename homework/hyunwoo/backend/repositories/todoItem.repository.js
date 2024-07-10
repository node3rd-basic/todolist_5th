import prisma from "../common/prisma.js";

// id에 맞는 todoItem 찾기
export async function getTodoItemById(id) {
  return await prisma.todoItem.findUnique({
    where: {
      id,
    },
  });
}

// todoItems 찾기
export async function findTodoItemsById(userId) {
  const todoItems =  await prisma.todoItem.findMany({
    where: {
      userId,
    },
  });
  return todoItems
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
  return await prisma.todoItem.update({
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
  return await prisma.todoItem.delete({
    where: {
      id,
    },
  });
}
