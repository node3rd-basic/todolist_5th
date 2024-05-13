import {
    deleteTodoItemById,
    findTodoItemById,
    findTodoItemsByKeyword,
    findTodoItemsByUserId,
    saveTodoItem, toggleStatusOfTodoItemById, validateTitle
} from "../service/todoItems.js";

export async function getTodoItems(req, res) {
    try {
        const todoItems = await findTodoItemsByUserId(req.user.id)
        res.send(todoItems)
    } catch(e) {
        console.error(e)
        res.status(500).send(e.message)
    }

}

export async function getTodoItem(req, res){
    try {
        const {id} = req.params
        const todoItem = await findTodoItemById(+id)
        res.send(todoItem)
    } catch(e) {
        console.error(e)
        res.status(404).send(e.message)
    }
}

export async function getTodoItemsByKeyword (req, res){
    const { keyword } = req.query
    const todoItems = await findTodoItemsByKeyword(keyword)
    res.send(todoItems)
}

export async function postTodoItem(req, res) {
    try {
        const { title } = req.body
        validateTitle(title)
        const newItem = await saveTodoItem(title, req.user.id)
        res.send(newItem)
    } catch (e) {
        console.error(e)
        res.status(400).send(e.message)
    }
}

export async function putTodoItem (req, res) {
    try {
        const {id} = req.params
        await toggleStatusOfTodoItemById(+id, req.user.id)
        res.send({ message: "Ok"})
    } catch(e) {
        console.error(e)
        res.status(401).send(e.message)
    }
}

export async function deleteTodoItem (req, res) {
    try {
        const {id} = req.params
        await deleteTodoItemById(+id, req.user.id)
        res.send({"message": "ok"})
    } catch(e) {
        console.error(e)
        res.status(401).send(e.message)
    }

}