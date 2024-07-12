// import todoItems from "../db/todoitems.js";
import todoItemsDB from "../db/todoitems.js";
import * as todoItemsRepository from "../repository/todoitems.repository.js";
//userId를 가져왔으니 user.id에서 userId로
//인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
//목록조회
export async function getTodoItemsByUserId(userId) {
  return await todoItemsRepository.findMany(userId);
}
//할일등록
export async function postTodoItem(userId, title) {
  console.log("user_id", userId);
  const newTodoItem = {
    userId: +userId,
    title: title,
  };
  const savedTodoItemId = await todoItemsRepository.saveTodoItem(newTodoItem);
  console.log("savedTodoItemId", savedTodoItemId);
  //api 스펙이 안맞으므로 다시 돌려야함 맵 : 아이디로 투두아이템 조회해서 꺼내와야함
  //아이디로 1개조회 -> 이걸로 맵 돌리기
  const id = savedTodoItemId.id;
  const savedTodoItem = await todoItemsRepository.oneTodoItem(
    id
    // savedTodoItemId.id
  );
  console.log("나와라savedTodoItem->", savedTodoItem);
  //하나씩 지정해주기.......
  return {
    id: savedTodoItem.id,
    userId: savedTodoItem.userId,
    title: savedTodoItem.title,
    doneAt: savedTodoItem.doneAt,
    createdAt: savedTodoItem.createdAt,
    updatedAt: savedTodoItem.updatedAt,
  };
}
//할일 1개 조회
export async function oneTodoItem(id) {
  const todoItem = await todoItemsRepository.oneTodoItem(id);
  if (!todoItem) {
    throw new Error("투두아이템이 없습니다.");
  }
  return todoItem;
}
//할일수정//

export async function toggleTodoItemDone(userId, id) {
  console.log("아이디타입", typeof id);
  const todoItem = await todoItemsRepository.oneTodoItem(id);
  if (!todoItem) {
    throw new Error("해당 투두아이템을 찾을 수 없습니다.");
  }
  if (todoItem.userId !== userId) {
    throw new Error("일치하지 않습니다.");
  }
  console.log("id000", todoItem.user_id);
  console.log("나와라아이디", userId);
  return await todoItemsRepository.update(
    id,
    todoItem.doneAt ? null : new Date()
  );
}
//삭제
export async function findDelById(userId, id) {
  const findTodoItem = await todoItemsRepository.oneTodoItem(id);
  if (!findTodoItem) {
    throw new Error("일치하지 않습니다.");
  }
  //userid와 todoItem의 유저아이디가 같은지 확인해야함
  console.log("findTodoItem-->", findTodoItem);
  if (findTodoItem.userId !== userId) {
    console.log("user_id-->", findTodoItem.userId);
    console.log("userId", userId);
    throw new Error("할말이없당...");
  }
  await todoItemsRepository.deleteItem(id);
  //할일이 있다면 : 자르기
  // todoItemsRepository.spliceIndex(delTodoItem, 1);
  return;
}
