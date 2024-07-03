import * as todoitemRepository from "../repositories/todoitem.repository.js";
import * as todoitemService from "../services/todoitem.service.js";

//할일 목록 조회 api
export const getTodolists = async (req, res) => {
  const { id } = req.user;
  const data = await todoitemRepository.getTodolists(id);
  return res.status(200).send(data);
};

//할일 목록 한개 조회 api
export const getTodolist = (req, res) => {
  const { id } = req.params;

  const data = todoitemRepository.getTodolist(id);
  return res.status(200).send(data);
};
//todoitem 생성 api
export const postTodoitem = async (req, res) => {
  const { title } = req.body;
  const { id } = req.user;
  if (!title) throw new Error("제목을 입력해주세요^^");

  const data = await todoitemRepository.postTodolist(title, id);

  res.status(201).json(data);
};

export const putTodoitem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = await todoitemService.putTodoitem(id, userId);

  res.status(201).json(data);
};

export const deleteTodoitem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = await todoitemService.deleteTodoitem(id, userId);
  if (data) {
    res.status(200).json({ message: "정상적으로 삭제되었습니다." });
  }
};
