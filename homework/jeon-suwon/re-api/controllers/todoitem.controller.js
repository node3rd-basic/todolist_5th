import { todoData } from "../db/todoitem.db.js";
import { user } from "../db/user.db.js";

//할일 목록 조회 api
export const getTodolists = (req, res) => {
  return res.status(200).send(todoData);
};

//할일 목록 한개 조회 api
export const getTodolist = (req, res) => {
  const { id } = req.params;

  const selectData = todoData.find((el) => el.id === +id);

  return res.status(200).send(selectData);
};

export const postTodoitem = (req, res) => {
  const { title } = req.body;
  const { userId } = req.user;

  if (!title) {
    res.status(400).json({ message: "존재하지않는 게시물입니다." });
    return;
  }

  const todoitem = {
    id: todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1,
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoData.push(todoitem);
  res.status(201).json(todoitem);
};

export const putTodoitem = (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const findTodoItem = todoData.find((el) => el.id === +id);
  const changeTodoItem = {
    id,
    userId,
    title: findTodoItem.title,
    doneAt: new Date(),
    createdAt: findTodoItem.createdAt,
    updatedAt: new Date(),
  };

  res.status(201).json(changeTodoItem);
};

export const deleteTodoitem = (req, res) => {
  const { id } = req.params;

  const findData = todoData.findIndex((el) => el.id === +id);
  if (findData === -1) {
    res.status(400).json({ message: "존재하지않는 게시물입니다." });
  }

  todoData.splice(findData, 1);
  res.status(200).json({ result: true });
};
