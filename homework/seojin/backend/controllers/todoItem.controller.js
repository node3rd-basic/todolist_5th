import * as todoItemService from "../services/todoItem.service.js"


const validateTodoItemId = (req) => {
    const idAsNumber = Number(req.params.id)
    if (isNaN(idAsNumber)){
        throw new Error("아이디는 숫자여야 합니다.")
    }
    return idAsNumber
}

export function getTodoItems(req, res){
    const user = req.user
    const todoItems = todoItemService.getTodoItmesByUserId(user.id)
    res.send(todoItems)
}

export function postTodoItem(req, res){
    const {title} = req.body;
    const user = req.user
   const newTodoItem = todoItemService.saveTodoItem(title, user.id)
    res.send(newTodoItem);
}

export function getTodoItem(req, res){
    try{
        const id= validateTodoItemId(req)
        const todoItem = todoItemService.getTodoItemById(id)
        res.send(todoItem)
    }catch(err){
        res.status(400).send(e.message)
    }
}

export function putTodoItem(req, res){
    const id = validateTodoItemId(req)
   todoItemService.toggleDoneAtById(id)
   res.send({result: true})
}

export function deleteTodoItem(req,res){
    const id = validateTodoItemId(req)
    todoItemService.deleteTodoItemById(id)
    res.send({ result: true });
  };