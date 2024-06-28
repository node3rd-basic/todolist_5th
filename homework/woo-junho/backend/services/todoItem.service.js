import * as todoItemRepository from "../repositories/todoItem.repository.js"

export async function getTodoItemsByUserId(userId) {
    return await todoItemRepository.findMany(userId)
}

export async function saveTodoItem(title, userId) {
    const newTodoItem = {
        "userId": userId,
        "title": title,
    }
    await todoItemRepository.saveTodoItem(newTodoItem)
    return newTodoItem
}

export function getTodoItemById(id) {
    const todoItem = todoItemRepository.findOneById(id)
    if (!todoItem) {
        throw new Error("Todo item not found")
    }
    return todoItem
}

export function toggleDontAtById(id) {
    const selectedTodoItem = getTodoItemById(id)
    const doneAt = selectedTodoItem.doneAt ? null : new Date()
    todoItemRepository.update(selectedTodoItem, doneAt)
}

export function deleteTodoItemById(id) {
    const selectedTodoItem = getTodoItemById(id)
    todoItemRepository.deleteOne(selectedTodoItem)
}