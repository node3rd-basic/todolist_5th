import * as todoItemService from '../services/todoItem.service.js';

//할일 목록 조회 (1)
export const getTodoItems = (req, res) => {
  //사용자 인증 미들웨어에서 유저 아이디 받아오기
  const userId = req.user.id;

  const myTodoItems = todoItemService.getTodoItemByUserId(userId);

  res.status(200).json(myTodoItems);
};

//할일 목록 상세 조회 (2)
export const getTodoItem = (req, res) => {
  //req.params에서 투두아이템 아이디 받아오기
  const { todoItemId } = req;
  //사용자 인증 미들웨어에서 유저의 id 받아오기
  const userId = req.user.id;

  const selectedTodoItem = todoItemService.getTodoItem(todoItemId, userId);

  res.status(200).json(selectedTodoItem);
};

//할일 등록 (3)
export const postTodoItem = (req, res) => {
  //인증 미들웨어로 userId 받아오기
  const userId = req.user.id;
  //req.body에서 title 받아오기
  const { title } = req.body;

  //title을 입력하지 않았다면 오류 반환
  if (!title) {
    res.status(400).json({ message: '할일 내용을 입력해주세요.' });
    return;
  }

  const newTodoItem = todoItemService.postTodoItem(userId, title);

  res.status(201).json(newTodoItem);
};

//할일 완료 여부 토글 (4)
export const putTodoItem = (req, res) => {
  //투두 아이템 아이디 파싱
  const { todoItemId } = req;
  //유저 아이디 파싱
  const userId = req.user.id;

  todoItemService.todoItemDoneAt(todoItemId, userId);

  res.status(200).json({ result: true });
};

//할일 삭제 (5)
export const deleteTodoItem = (req, res) => {
  //투두 아이템 아이디 파싱
  const { todoItemId } = req;
  //유저 아이디 파싱
  const userId = req.user.id;

  todoItemService.deleteTodoItem(todoItemId, userId);

  res.status(200).json({ result: true });
};
