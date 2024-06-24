import * as todoItemRepository from "../repositories/todoItem.repository.js"

export function getTodoItemsByUserId(userId) {
    return todoItemRepository.findMany(userId)
}

export function saveTodoItem(title, userId) {
    const newId = todoItemRepository.getNewId()
    const newTodoItem = {
        "id": newId,
        "userId": userId,
        "title": title,
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    }
    todoItemRepository.saveTodoItem(newTodoItem)
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