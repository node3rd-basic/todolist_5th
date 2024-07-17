import * as todoItemService from "../services/todoItem.service.js"

const validateTodoItemId = (req) => {
    const idAsNumber = Number(req.params.id)
    if (isNaN(idAsNumber)) {
        throw new Error("ID must be a number")
    }

    return idAsNumber
}

export async function getTodoItems(req, res) {
    const user = req.user
    const todoItems = await todoItemService.getTodoItemsByUserId(user.id)
    res.send(todoItems)
}

export async function postTodoItem(req, res) {
    const { title } = req.body
    const user = req.user
    const newTodoItem = await todoItemService.saveTodoItem(title, user.id)
    res.send(newTodoItem)
}

export function getTodoItem(req, res) {
    try {
        const id = validateTodoItemId(req)
        const todoItem = todoItemService.getTodoItemById(id)
        res.send(todoItem)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

export async function putTodoItem(req, res, next) {
    try {
        const id = validateTodoItemId(req)
        await todoItemService.toggleDontAtById(id)
        res.send({result: true})
    } catch (e) {
        next(e)
    }
}

export async function deleteTodoItem(req, res) {
    const id = validateTodoItemId(req)
    await todoItemService.deleteTodoItemById(id)
    res.send({
        "result": true
    })
}