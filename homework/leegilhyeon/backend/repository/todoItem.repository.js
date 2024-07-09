import prisma from "../common/prisma.js"

export async function findTodoItemById(id) {
  return await prisma.todoItem.findUnique({
    where: { id }
  })
}

export async function findTodoItems(userId) {
  return await prisma.todoItem.findMany({
    where:{
      userId
    }
  })
}

export async function pushTodoItem(saveTodoItem) {
  return await prisma.todoItem.create({
    data: {
      userId: saveTodoItem.userId,
      title: saveTodoItem.title
    }
  })
}

export async function putTodoItem(id, doneAt) {

   await prisma.todoItem.update({
    where: {
      id
    },
    data: {
      doneAt,
    },
  })
}

export async function deleteById(id) {
    await prisma.todoItem.delete({
    where: {
      id
    },
  })
}
