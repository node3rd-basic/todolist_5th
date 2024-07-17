import * as todoItemService from '../services/todoItem.service.js';
import * as validate from '../validatetor/todoitemid.validatetor.js';


export async function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = await todoItemService.getTodoItemsByUserId(user.id);
  res.send(todoItems);
}

export async function getTodoItem(req, res) {
  const {id} = req.params;
  const todoItems = await todoItemService.getTodoItemsById(id);
  res.send(todoItems);
}

export async function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  const newTodoItem = await todoItemService.createTodoItem(title, user.id);
  res.send(newTodoItem);
}

export async function deleteTodoItem(req, res) {
  const id = validate.validateTodoItemId(req);
  await todoItemService.deleteTodoItemById(Number(id));
  res.send({ result: 'true' });
}

export async function putTodoItem(req, res) {
  const id = validate.validateTodoItemId(req);
  await todoItemService.toggleDonAtById(Number(id));
  res.send({ result: 'true' });
}
