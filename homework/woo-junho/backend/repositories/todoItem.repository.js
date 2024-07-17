import prisma from "../common/prisma.js";
import { Prisma } from "@prisma/client";

export async function findMany(userId) {
    return await prisma.TodoItem.findMany({
            where: {
                userId
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        }
    )
}

export async function saveTodoItem(todoItem) {
    return await prisma.TodoItem.create({
        data: {
            title: todoItem.title,
            userId: todoItem.userId
        }
    })
}

export async function findOneById(id) {
    return await prisma.TodoItem.findUnique({
        where: {
            id
        }
    })
}

export async function update(id, doneAt) {
    await prisma.TodoItem.update({
        where: {id},
        data: {
            doneAt,
        },
    })
}

export async function deleteOne(id) {
    await prisma.TodoItem.delete({
        where: { id },
    })
}