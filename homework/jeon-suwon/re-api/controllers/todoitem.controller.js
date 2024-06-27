import * as todoitemRepository from "../repositories/todoitem.repository.js";
import * as todoitemService from "../services/todoitem.service.js";

//할일 목록 조회 api
export const getTodolists = (req, res) => {
  const data = todoitemRepository.getTodolists();
  return res.status(200).send(data);
};

//할일 목록 한개 조회 api
export const getTodolist = (req, res) => {
  const { id } = req.params;

  const data = todoitemRepository.getTodolist(id);
  return res.status(200).send(data);
};
//todoitem 생성 api
export const postTodoitem = (req, res) => {
  const { title } = req.body;
  const { userId } = req.user;
  if (!title) throw new Error("제목을 입력해주세요^^");

  const data = todoitemRepository.postTodolist(title, userId);

  res.status(201).json(data);
};

export const putTodoitem = (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const data = todoitemService.putTodoitem(id, userId);

  res.status(201).json(data);
};

export const deleteTodoitem = (req, res) => {
  const { id } = req.params;

  if (todoitemService.deleteTodoitem(id)) {
    res.status(200).json({ message: "정상적으로 삭제되었습니다." });
  }
};
