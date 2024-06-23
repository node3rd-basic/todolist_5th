import todoItems from "../db/todoItems.js";

export function getTodoItem(req, res, next) {
  const user = req.user;
  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
}

export function postTodoItem(req, res, next) {
  const user = req.user;
  const { title } = req.body;

  const newId = getIncrementedId(todoItems);

  const newTodoItem = {
    id: newId,
    userId: user.id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);

  res.send(newTodoItem);
}
