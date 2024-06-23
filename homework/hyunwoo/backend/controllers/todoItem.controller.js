import todoItems from "../db/todoItems.js";

export function getTodoItem (req, res, next) {
    const user = req.user;
    res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
}
