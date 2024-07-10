import todoItemsDB from "../db/todoitems.js";
import * as todoItemsService from "../service/todoitems.service.js";
///할일목록 조회
export async function getTodoItems(req, res, next) {
  try {
    const user = req.user;
    const todoItems = await todoItemsService.getTodoItemsByUserId(user.id);
    // console.log("todoItems-->", todoItems);
    res.send(todoItems);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

//할일등록
export async function postTodoItem(req, res) {
  //인증시 뭘로 인증할건지 그 인증할 것은 어디서 가져올건지
  const user = req.user;
  const { title } = req.body;
  console.log("7777user", user);
  //결과반환 : 클라이언트에게 전달
  const userId = user.id;
  const newTodoItem = await todoItemsService.postTodoItem(userId, title);
  console.log("user.id", userId);
  res.send(newTodoItem);
}

//할일목록 1개 조회
export async function getTodoItem(req, res, next) {
  //유저정보 가져 왔으니 user.id내가만든 할일todoitems 중에서 하나: 특정 할일id, 만 볼 수 있도록 :찾기
  //근데 아이디는 숫자이고, :id에서 가져옴
  const id = Number(req.params.id);

  const TodoItem = await todoItemsService.oneTodoItem(id);
  //결과반환
  res.send(TodoItem);
}

//수정/여기부터 하기 : 발리데이터 만들까?
export async function putTodoItem(req, res, next) {
  //내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  const userId = req.user.id;
  console.log("컨트롤러아이디타입", typeof userId);
  const id = Number(req.params.id);
  console.log("넘버-아이디타입", typeof id);
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
    return;
  }
  try {
    const updatedItem = await todoItemsService.toggleTodoItemDone(userId, id);
    res.send({ result: true, item: updatedItem });
  } catch (error) {
    res.status(404).send({
      result: false,
    });
  }
}

//삭제
export async function delTodoItem(req, res) {
  ////내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  const userId = req.user.id;
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
  }
  //삭제하기: 할일이 없을 경우
  const delTodoItem = await todoItemsService.findDelById(userId, id);

  res.send({ result: true });
}
