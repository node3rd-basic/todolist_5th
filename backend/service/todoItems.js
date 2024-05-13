import {
    deleteItem,
    findByKeyword,
    findByUserId,
    findOneById,
    save,
    update,
} from "../repository/todoItems.js";

export async function findTodoItemsByUserId(userId) {
    return findByUserId(userId)
}

export async function findTodoItemById(id) {
    const item = await findOneById(id)
    if (!item) {
        throw Error("Not Found todo-item")
    }
    return item
}

export function findIndexOfTodoItemById(id) {
    const index = findIndexOneById(id)
    if (index === -1) {
        throw Error("Not Found todo-item")
    }
    return index
}

export function findTodoItemsByKeyword(keyword) {
    return findByKeyword(keyword)
}

export function validateTitle(title) {
    if (!title) {
        throw Error("Title is required!")
    }
}

export async function saveTodoItem(title, userId) {
    const newItem = {
        title,
        userId,
        doneAt: null,
    }
    const lastId = await save(newItem)
    return {...newItem, id: lastId}
}

export async function toggleStatusOfTodoItemById(id, userId) {
    try {
        const todoItem = await findOneById(id)
        console.log(todoItem)
        if (todoItem.userId !== userId) {
            throw Error("No permission")
        }
        await update(id, todoItem.doneAt === null ? new Date() : null)
    } catch {
        throw Error("No permission")
    }
}

export async function deleteTodoItemById(id, userId) {
    try {
        await deleteItem(id, userId)
    } catch {
        throw Error("Not Found todo-item")
    }
}