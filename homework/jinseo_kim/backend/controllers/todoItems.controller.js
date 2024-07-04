import * as todoItemService from '../services/todoItem.service.js';
import * as validate from '../validatetor/todoitemid.validatetor.js';


export function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = todoItemService.getTodoItemsByUserId(user.id);
  res.send(todoItems);
}

export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  const newTodoItem = todoItemService.createTodoItem(title, user.id);
  res.send(newTodoItem);
}

export function deleteTodoItem(req, res) {
  const id = validate.validateTodoItemId(req);
  todoItemService.deleteTodoItemById(id);
  res.send({ result: 'true' });
}

export function putTodoItem(req, res) {
  const id = validate.validateTodoItemId(req);
  todoItemService.toggleDonAtById(id);
  res.send({ result: 'true' });
}
